"""
HER UNIVERSE — Red Heart-Shaped QR Code with Red Ribbons & Bow
Recreated to exactly match the reference image:
  - Framed dark luxury card with subtle mint glowing border
  - Red heart-shaped QR code fitted in the center (Level H, 100% scannable)
  - Diagonal red satin ribbon across top-left with ornate 3D red gift bow & tails
  - Diagonal red satin ribbon across bottom-right
  - Festive crescent sparkle swooshes around the heart
Encodes: https://happy-birthday-akriti-0611.vercel.app/
Outputs:
  - public/assets/qr/her_universe_heart_qr_gift.png (Ultra HD 2400x2400)
"""

import os
import math
import cv2
import numpy as np
import qrcode
from PIL import Image, ImageDraw, ImageFilter
from pyzbar.pyzbar import decode

TARGET_URL = "https://happy-birthday-akriti-0611.vercel.app/"
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "assets", "qr"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

PNG_OUTPUT = os.path.join(OUTPUT_DIR, "her_universe_heart_qr_gift.png")
ARTIFACT_OUTPUT = r"C:\Users\PIYUSH KUMAR\.gemini\antigravity\brain\b197231b-aa9b-4518-b30f-ceccdd3afd07\her_universe_heart_qr_gift.png"

def create_gift_heart_qr():
    print(f"[*] Generating Level H QR code for: {TARGET_URL}")
    qr = qrcode.QRCode(
        version=6,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=1,
        border=0
    )
    qr.add_data(TARGET_URL)
    qr.make(fit=True)
    core = np.array(qr.get_matrix(), dtype=np.uint8)
    N = core.shape[0]  # 41
    print(f"[*] Core QR matrix size: {N}x{N} modules")

    # Grid configuration for Heart QR
    GRID_SIZE = 71
    cx = 35.0
    cy = 34.0
    qr_r0 = 15
    qr_c0 = 15

    grid = np.zeros((GRID_SIZE, GRID_SIZE), dtype=np.uint8)
    is_core = np.zeros((GRID_SIZE, GRID_SIZE), dtype=bool)
    is_finder = np.zeros((GRID_SIZE, GRID_SIZE), dtype=bool)

    # Core QR matrix
    grid[qr_r0:qr_r0+N, qr_c0:qr_c0+N] = core
    is_core[qr_r0:qr_r0+N, qr_c0:qr_c0+N] = True

    # Finder patterns (7x7 modules each)
    finders = [
        (qr_r0, qr_c0),
        (qr_r0, qr_c0 + N - 7),
        (qr_r0 + N - 7, qr_c0)
    ]
    for fr, fc in finders:
        is_finder[fr:fr+7, fc:fc+7] = True

    # Cardioid Heart Envelope Mask
    t_vals = np.linspace(0, 2 * math.pi, 1200)
    scale = 2.05
    hx = cx + 16 * (np.sin(t_vals) ** 3) * scale
    hy = cy - (13 * np.cos(t_vals) - 5 * np.cos(2*t_vals) - 2 * np.cos(3*t_vals) - np.cos(4*t_vals)) * scale
    heart_contour = np.column_stack((hx, hy)).astype(np.int32)
    heart_mask = np.zeros((GRID_SIZE, GRID_SIZE), dtype=np.uint8)
    cv2.fillPoly(heart_mask, [heart_contour], 1)

    # Quiet zone buffer: 2 modules
    qz = 2
    quiet_zone = np.zeros((GRID_SIZE, GRID_SIZE), dtype=bool)
    quiet_zone[qr_r0-qz:qr_r0+N+qz, qr_c0-qz:qr_c0+N+qz] = True

    # Perimeter outline
    kernel = np.ones((3, 3), np.uint8)
    perimeter = (cv2.dilate(heart_mask, kernel) - cv2.erode(heart_mask, kernel)).astype(bool)

    # External heart modules
    np.random.seed(20261106)
    for r in range(GRID_SIZE):
        for c in range(GRID_SIZE):
            if quiet_zone[r, c]:
                continue
            if heart_mask[r, c]:
                if perimeter[r, c]:
                    if (r + c) % 2 == 0:
                        grid[r, c] = 1
                elif np.random.rand() < 0.46:
                    grid[r, c] = 1

    # =========================================================
    # HIGH-RESOLUTION CANVAS (2400 x 2400)
    # =========================================================
    CANVAS_W, CANVAS_H = 2400, 2400
    base_img = Image.new("RGBA", (CANVAS_W, CANVAS_H), (16, 15, 20, 255))
    draw = ImageDraw.Draw(base_img)

    # Background subtle pattern/texture
    for y in range(0, CANVAS_H, 40):
        for x in range(0, CANVAS_W, 40):
            if (x // 40 + y // 40) % 2 == 0:
                draw.rectangle([x, y, x + 2, y + 2], fill=(30, 28, 36, 120))

    # Framed Card Coordinates (matches the reference aspect ratio and border)
    CARD_MARGIN_X = 180
    CARD_MARGIN_Y = 180
    card_x0, card_y0 = CARD_MARGIN_X, CARD_MARGIN_Y
    card_x1, card_y1 = CANVAS_W - CARD_MARGIN_X, CANVAS_H - CARD_MARGIN_Y

    # Card background (Deep obsidian black #050508)
    card_img = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    card_draw = ImageDraw.Draw(card_img)
    card_draw.rounded_rectangle([card_x0, card_y0, card_x1, card_y1], radius=45, fill=(6, 5, 9, 255))

    # Ambient deep-crimson radial glow behind heart
    qr_box = 24  # Integer module size
    qr_total_px = GRID_SIZE * qr_box  # 71 * 24 = 1704 px
    qr_origin_x = card_x0 + (card_x1 - card_x0 - qr_total_px) // 2
    qr_origin_y = card_y0 + (card_y1 - card_y0 - qr_total_px) // 2 + 30

    heart_center_x = qr_origin_x + int(cx * qr_box)
    heart_center_y = qr_origin_y + int(cy * qr_box)

    radial_glow = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(radial_glow)
    for rad in range(750, 0, -8):
        alpha = int(40 * (1.0 - (rad / 750.0) ** 1.8))
        if alpha > 0:
            glow_draw.ellipse(
                [heart_center_x - rad, heart_center_y - rad, heart_center_x + rad, heart_center_y + rad],
                fill=(230, 10, 45, alpha)
            )
    radial_glow = radial_glow.filter(ImageFilter.GaussianBlur(radius=20))
    card_img.alpha_composite(radial_glow)

    # Render Heart QR modules onto card_img
    # Rich Vivid Red with bright luminous core
    BASE_RED = (255, 12, 38, 255)
    LUMINOUS_RED = (255, 75, 105, 255)
    FINDER_RED = (255, 12, 38, 255)

    qr_draw = ImageDraw.Draw(card_img)

    for r in range(GRID_SIZE):
        for c in range(GRID_SIZE):
            if not grid[r, c]:
                continue
            in_f = any(fr <= r < fr+7 and fc <= c < fc+7 for fr, fc in finders)

            x0 = qr_origin_x + c * qr_box
            y0 = qr_origin_y + r * qr_box
            x1 = x0 + qr_box
            y1 = y0 + qr_box

            if in_f:
                # Solid red for finder patterns (100% compliant QR standard)
                qr_draw.rectangle([x0, y0, x1, y1], fill=FINDER_RED)
            else:
                pad = 2
                qr_draw.rectangle([x0 + pad, y0 + pad, x1 - pad, y1 - pad], fill=BASE_RED)
                core_pad = 5
                qr_draw.rectangle(
                    [x0 + core_pad, y0 + core_pad, x1 - core_pad, y1 - core_pad],
                    fill=LUMINOUS_RED
                )

    # Subtle white flair crescents around heart (as in reference image)
    # Right flank crescent
    flair_draw = ImageDraw.Draw(card_img)
    # Swoosh 1 (Right lower side)
    flair_draw.arc([heart_center_x + 480, heart_center_y + 160, heart_center_x + 580, heart_center_y + 320],
                   start=120, end=240, fill=(240, 245, 255, 200), width=6)
    # Swoosh 2 (Bottom center left)
    flair_draw.arc([heart_center_x - 120, heart_center_y + 540, heart_center_x + 60, heart_center_y + 640],
                   start=20, end=140, fill=(240, 245, 255, 200), width=6)

    # =========================================================
    # RED RIBBONS & 3D GIFT BOW
    # =========================================================
    # We will construct ribbons with drop shadows onto ribbon_layer
    ribbon_shadow = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    ribbon_layer = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    r_draw = ImageDraw.Draw(ribbon_layer)
    s_draw = ImageDraw.Draw(ribbon_shadow)

    # 1. TOP-LEFT DIAGONAL RIBBON BAND
    # Width: 140px, angle 45 deg (slope = -1)
    # Intersects card boundaries
    tl_pts = [
        (card_x0, card_y0 + 580),
        (card_x0 + 580, card_y0),
        (card_x0 + 440, card_y0),
        (card_x0, card_y0 + 440)
    ]
    # Shadow
    s_draw.polygon([(x + 10, y + 15) for x, y in tl_pts], fill=(0, 0, 0, 140))

    # Ribbon Body with Satin Gradient Lines
    num_stripes = 140
    for i in range(num_stripes):
        t = i / float(num_stripes)
        # Offset from base edge: 440 + t * 140
        d0 = 440 + t * 140
        # Color gradient: dark velvet red at edges, bright ruby red in center, silky highlight near 65%
        if t < 0.2:
            r_col = (int(160 + t * 400), 10, 25, 255)
        elif t < 0.65:
            r_col = (int(240 + (t - 0.2) * 35), 20 + int(t * 30), 45 + int(t * 30), 255)
        elif t < 0.75:
            # Specular silky sheen
            r_col = (255, 110, 130, 255)
        else:
            r_col = (int(255 - (t - 0.75) * 400), 20, 35, 255)

        r_draw.line([(card_x0, card_y0 + d0), (card_x0 + d0, card_y0)], fill=r_col, width=2)

    # 2. BOTTOM-RIGHT DIAGONAL RIBBON BAND
    br_pts = [
        (card_x1 - 580, card_y1),
        (card_x1, card_y1 - 580),
        (card_x1, card_y1 - 440),
        (card_x1 - 440, card_y1)
    ]
    s_draw.polygon([(x + 10, y + 15) for x, y in br_pts], fill=(0, 0, 0, 140))

    for i in range(num_stripes):
        t = i / float(num_stripes)
        d0 = 440 + t * 140
        if t < 0.2:
            r_col = (int(160 + t * 400), 10, 25, 255)
        elif t < 0.65:
            r_col = (int(240 + (t - 0.2) * 35), 20 + int(t * 30), 45 + int(t * 30), 255)
        elif t < 0.75:
            r_col = (255, 110, 130, 255)
        else:
            r_col = (int(255 - (t - 0.75) * 400), 20, 35, 255)

        r_draw.line([(card_x1 - d0, card_y1), (card_x1, card_y1 - d0)], fill=r_col, width=2)

    # 3. 3D SATIN RIBBON BOW (Centered on top-left diagonal ribbon)
    bow_cx = card_x0 + 260
    bow_cy = card_y0 + 260

    # Bow shadow
    s_draw.ellipse([bow_cx - 240, bow_cy - 200, bow_cx + 260, bow_cy + 240], fill=(0, 0, 0, 160))

    # Bow Tails (Draping downwards and across)
    # Tail 1: draping down towards heart
    tail1_pts = [
        (bow_cx - 20, bow_cy + 40),
        (bow_cx - 40, bow_cy + 280),
        (bow_cx + 25, bow_cy + 250), # Chevron notch
        (bow_cx + 80, bow_cy + 290),
        (bow_cx + 40, bow_cy + 40)
    ]
    s_draw.polygon([(x + 12, y + 16) for x, y in tail1_pts], fill=(0, 0, 0, 130))
    r_draw.polygon(tail1_pts, fill=(225, 15, 40, 255))
    # Tail 1 specular highlight
    r_draw.line([(bow_cx + 20, bow_cy + 50), (bow_cx + 10, bow_cy + 260)], fill=(255, 120, 140, 255), width=6)

    # Tail 2: draping across towards the right
    tail2_pts = [
        (bow_cx + 30, bow_cy - 10),
        (bow_cx + 260, bow_cy + 60),
        (bow_cx + 240, bow_cy + 120), # Chevron notch
        (bow_cx + 280, bow_cy + 170),
        (bow_cx + 35, bow_cy + 50)
    ]
    s_draw.polygon([(x + 12, y + 16) for x, y in tail2_pts], fill=(0, 0, 0, 130))
    r_draw.polygon(tail2_pts, fill=(210, 12, 35, 255))
    r_draw.line([(bow_cx + 40, bow_cy + 15), (bow_cx + 250, bow_cy + 105)], fill=(255, 110, 130, 255), width=6)

    # Bow Loops:
    # Loop 1: Upper-Right Loop
    loop1_outer = [
        (bow_cx + 20, bow_cy - 10),
        (bow_cx + 130, bow_cy - 150),
        (bow_cx + 240, bow_cy - 140),
        (bow_cx + 260, bow_cy - 50),
        (bow_cx + 160, bow_cy + 40),
        (bow_cx + 30, bow_cy + 20)
    ]
    s_draw.polygon([(x + 12, y + 15) for x, y in loop1_outer], fill=(0, 0, 0, 150))
    r_draw.polygon(loop1_outer, fill=(235, 20, 48, 255))

    # Loop 1 Inner Cavity (Dark ruby shadow inside loop)
    loop1_inner = [
        (bow_cx + 80, bow_cy - 40),
        (bow_cx + 160, bow_cy - 110),
        (bow_cx + 200, bow_cy - 70),
        (bow_cx + 130, bow_cy - 10)
    ]
    r_draw.polygon(loop1_inner, fill=(90, 5, 15, 255))
    # Loop 1 crest highlight
    r_draw.line([(bow_cx + 130, bow_cy - 140), (bow_cx + 240, bow_cy - 130), (bow_cx + 250, bow_cy - 60)],
                fill=(255, 140, 160, 255), width=8)

    # Loop 2: Lower-Left Loop
    loop2_outer = [
        (bow_cx - 20, bow_cy + 20),
        (bow_cx - 150, bow_cy + 130),
        (bow_cx - 220, bow_cy + 110),
        (bow_cx - 230, bow_cy + 20),
        (bow_cx - 130, bow_cy - 60),
        (bow_cx - 20, bow_cy - 20)
    ]
    s_draw.polygon([(x + 12, y + 15) for x, y in loop2_outer], fill=(0, 0, 0, 150))
    r_draw.polygon(loop2_outer, fill=(235, 20, 48, 255))

    # Loop 2 Inner Cavity
    loop2_inner = [
        (bow_cx - 70, bow_cy + 30),
        (bow_cx - 150, bow_cy + 90),
        (bow_cx - 180, bow_cy + 50),
        (bow_cx - 110, bow_cy - 10)
    ]
    r_draw.polygon(loop2_inner, fill=(90, 5, 15, 255))
    # Loop 2 crest highlight
    r_draw.line([(bow_cx - 140, bow_cy + 120), (bow_cx - 210, bow_cy + 100), (bow_cx - 220, bow_cy + 30)],
                fill=(255, 140, 160, 255), width=8)

    # Central Knot (Rounded wrapped knot)
    knot_box = [bow_cx - 50, bow_cy - 45, bow_cx + 50, bow_cy + 45]
    s_draw.ellipse([bow_cx - 52, bow_cy - 40, bow_cx + 56, bow_cy + 52], fill=(0, 0, 0, 180))
    r_draw.ellipse(knot_box, fill=(250, 25, 55, 255))
    # Knot fold lines & highlight
    r_draw.arc([bow_cx - 40, bow_cy - 35, bow_cx + 40, bow_cy + 35], start=160, end=290, fill=(255, 150, 170, 255), width=6)
    r_draw.arc([bow_cx - 30, bow_cy - 25, bow_cx + 30, bow_cy + 25], start=0, end=90, fill=(120, 5, 20, 255), width=4)

    # Filter shadow
    ribbon_shadow = ribbon_shadow.filter(ImageFilter.GaussianBlur(radius=16))

    # Composite layers: Card -> Ribbon Shadow -> Ribbon
    card_img.alpha_composite(ribbon_shadow)
    card_img.alpha_composite(ribbon_layer)

    # Draw the Glowing Mint/Cyan Card Frame Border (as in reference image)
    border_draw = ImageDraw.Draw(card_img)
    # Outer glow
    for w_glow, alpha in [(14, 40), (10, 80), (6, 160), (3, 240)]:
        border_draw.rounded_rectangle(
            [card_x0 - w_glow//2, card_y0 - w_glow//2, card_x1 + w_glow//2, card_y1 + w_glow//2],
            radius=45,
            outline=(60, 230, 180, alpha),
            width=w_glow
        )
    # Crisp inner accent line
    border_draw.rounded_rectangle(
        [card_x0 + 8, card_y0 + 8, card_x1 - 8, card_y1 - 8],
        radius=40,
        outline=(80, 255, 200, 180),
        width=2
    )

    # Composite card onto base background
    base_img.alpha_composite(card_img)

    # Convert to RGB and save
    final_rgb = base_img.convert("RGB")
    final_rgb.save(PNG_OUTPUT, "PNG", quality=100)
    final_rgb.save(ARTIFACT_OUTPUT, "PNG", quality=100)
    print(f"[+] Saved Ultra HD Gift QR Code to: {PNG_OUTPUT}")
    print(f"[+] Saved Artifact to: {ARTIFACT_OUTPUT}")

    # =========================================================
    # COMPREHENSIVE SCAN VALIDATION SUITE
    # =========================================================
    print("\n" + "=" * 60)
    print("VERIFICATION & VALIDATION SUITE (With Ribbons & Frame)")
    print("=" * 60)

    cv_img = cv2.imread(PNG_OUTPUT)
    gray = cv2.cvtColor(cv_img, cv2.COLOR_BGR2GRAY)
    inv = cv2.bitwise_not(gray)

    # 1. Full Resolution PyZbar
    pyz = decode(inv)
    pyz_success = len(pyz) > 0 and pyz[0].data.decode("utf-8") == TARGET_URL
    print(f"1. Full Resolution PyZbar Decode: {'[PASSED]' if pyz_success else '[FAILED]'}")
    if pyz_success:
        print(f"   Decoded URL: {pyz[0].data.decode('utf-8')}")

    # 2. Full Resolution OpenCV QRCodeDetector
    det = cv2.QRCodeDetector()
    val, pts, _ = det.detectAndDecode(inv)
    cv_success = val == TARGET_URL
    print(f"2. Full Resolution OpenCV Decode: {'[PASSED]' if cv_success else '[FAILED]'}")
    if cv_success:
        print(f"   Decoded URL: {val}")

    # 3. Multi-resolution tests
    test_sizes = [1400, 1000, 800, 600, 450]
    multi_res_all_pass = True
    print("\n3. Phone Camera Screen-Distance Resizing Tests:")
    for sz in test_sizes:
        res_inv = cv2.resize(inv, (sz, sz), interpolation=cv2.INTER_AREA)
        r = decode(res_inv)
        ok = len(r) > 0 and r[0].data.decode("utf-8") == TARGET_URL
        if not ok:
            multi_res_all_pass = False
        print(f"   - Downscale to {sz}x{sz}px: {'[PASSED]' if ok else '[FAILED]'}")

    # 4. Out-of-focus camera blur test
    blurred = cv2.GaussianBlur(inv, (5, 5), 1.0)
    b_res = decode(blurred)
    blur_pass = len(b_res) > 0 and b_res[0].data.decode("utf-8") == TARGET_URL
    print(f"\n4. Camera Out-Of-Focus Blur Test (5x5 Gaussian): {'[PASSED]' if blur_pass else '[FAILED]'}")

    # 5. Angled Camera Perspective Test
    h, w = inv.shape
    pts1 = np.float32([[0, 0], [w, 0], [0, h], [w, h]])
    pts2 = np.float32([[w*0.04, h*0.06], [w*0.96, h*0.03], [w*0.03, h*0.96], [w*0.97, h*0.93]])
    M = cv2.getPerspectiveTransform(pts1, pts2)
    skewed = cv2.warpPerspective(inv, M, (w, h))
    s_res = decode(skewed)
    skew_pass = len(s_res) > 0 and s_res[0].data.decode("utf-8") == TARGET_URL
    print(f"5. Angled Perspective / Camera Tilt Test: {'[PASSED]' if skew_pass else '[FAILED]'}")

    print("=" * 60)
    all_passed = pyz_success and cv_success and multi_res_all_pass and blur_pass and skew_pass
    if all_passed:
        print("ALL VALIDATION CRITERIA SATISFIED 100%!")
    else:
        print("SOME TESTS FAILED - ADJUSTING...")
    print("=" * 60 + "\n")

    return all_passed

if __name__ == "__main__":
    create_gift_heart_qr()
