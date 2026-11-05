"""
HER UNIVERSE — Red Heart-Shaped QR Code Generator
Engineered for 100% camera scannability + high-end romantic/futuristic aesthetic.
Encodes: https://happy-birthday-akriti-0611.vercel.app/
Outputs:
  - public/assets/qr/her-universe-heart-qr.png (High-Res 2000x2000)
  - public/assets/qr/her-universe-heart-qr.svg (Vector SVG)
  - public/assets/qr/heart_qr_matrix.json (Matrix data for Web/React progressive animation)
"""

import os
import json
import math
import cv2
import numpy as np
import qrcode
from pyzbar.pyzbar import decode

TARGET_URL = "https://happy-birthday-akriti-0611.vercel.app/"
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "assets", "qr"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

PNG_PATH = os.path.join(OUTPUT_DIR, "her-universe-heart-qr.png")
SVG_PATH = os.path.join(OUTPUT_DIR, "her-universe-heart-qr.svg")
JSON_PATH = os.path.join(OUTPUT_DIR, "heart_qr_matrix.json")

def generate_heart_qr():
    print(f"[*] Generating authentic Error Correction Level H QR code for: {TARGET_URL}")
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

    # Grid configuration
    GRID_SIZE = 71
    cx = 35.0
    cy = 34.0
    qr_r0 = 15
    qr_c0 = 15

    grid = np.zeros((GRID_SIZE, GRID_SIZE), dtype=np.uint8)
    is_core = np.zeros((GRID_SIZE, GRID_SIZE), dtype=bool)
    is_finder = np.zeros((GRID_SIZE, GRID_SIZE), dtype=bool)

    # Place core QR matrix
    grid[qr_r0:qr_r0+N, qr_c0:qr_c0+N] = core
    is_core[qr_r0:qr_r0+N, qr_c0:qr_c0+N] = True

    # Finder pattern coordinates (7x7 modules each)
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

    # Quiet zone buffer around active QR core: exactly 2 modules
    qz = 2
    quiet_zone = np.zeros((GRID_SIZE, GRID_SIZE), dtype=bool)
    quiet_zone[qr_r0-qz:qr_r0+N+qz, qr_c0-qz:qr_c0+N+qz] = True

    # Perimeter outline
    kernel = np.ones((3, 3), np.uint8)
    perimeter = (cv2.dilate(heart_mask, kernel) - cv2.erode(heart_mask, kernel)).astype(bool)

    # Fill external heart modules
    np.random.seed(20261106)
    for r in range(GRID_SIZE):
        for c in range(GRID_SIZE):
            if quiet_zone[r, c]:
                continue
            if heart_mask[r, c]:
                if perimeter[r, c]:
                    # Alternating stardust border beads
                    if (r + c) % 2 == 0:
                        grid[r, c] = 1
                elif np.random.rand() < 0.46:
                    grid[r, c] = 1

    # =========================================================
    # RENDER HIGH-RESOLUTION PNG (2000x2000)
    # =========================================================
    canvas_size = 2000
    box = 28
    offset = (canvas_size - GRID_SIZE * box) // 2  # 6 px padding on all sides

    # Base image: deep black background #050508
    img = np.zeros((canvas_size, canvas_size, 3), dtype=np.uint8)
    img[:] = (8, 5, 5)  # BGR #050508

    # Ambient deep-crimson radial glow behind the heart
    Y, X = np.ogrid[:canvas_size, :canvas_size]
    heart_center_px = (offset + int(cx * box), offset + int(cy * box))
    dist_map = np.sqrt((X - heart_center_px[0])**2 + (Y - heart_center_px[1])**2)
    glow_radius = 880.0
    glow_intensity = np.clip(1.0 - dist_map / glow_radius, 0, 1) ** 2.0
    img[:, :, 2] = np.clip(img[:, :, 2] + (glow_intensity * 38), 0, 255).astype(np.uint8)

    # Module metadata for JSON export
    module_data = []

    # Render modules
    for r in range(GRID_SIZE):
        for c in range(GRID_SIZE):
            if not grid[r, c]:
                continue

            in_f = any(fr <= r < fr+7 and fc <= c < fc+7 for fr, fc in finders)
            is_c = bool(is_core[r, c])

            y0 = offset + r * box
            y1 = y0 + box
            x0 = offset + c * box
            x1 = x0 + box

            module_data.append({
                "r": r,
                "c": c,
                "isCore": is_c,
                "isFinder": in_f,
                "x": x0,
                "y": y0,
                "size": box,
                "distFromCenter": round(math.sqrt((r - cy)**2 + (c - cx)**2), 2)
            })

            if in_f:
                # Solid red for finder patterns (100% compliant QR standard)
                img[y0:y1, x0:x1] = (35, 12, 255)  # BGR vivid rich red #FF0C23
            else:
                # Stylized data module with micro-gap and luminous core
                pad = 2
                img[y0+pad:y1-pad, x0+pad:x1-pad] = (35, 12, 255)  # Base red
                core_pad = 6
                img[y0+core_pad:y1-core_pad, x0+core_pad:x1-core_pad] = (95, 65, 255)  # Luminous core

    cv2.imwrite(PNG_PATH, img)
    print(f"[+] Saved high-resolution PNG: {PNG_PATH}")

    # =========================================================
    # GENERATE SCALABLE SVG (2000x2000)
    # =========================================================
    svg_lines = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {canvas_size} {canvas_size}" width="100%" height="100%" shape-rendering="crispEdges">',
        '  <defs>',
        f'    <radialGradient id="heartAura" cx="{heart_center_px[0]/canvas_size*100:.1f}%" cy="{heart_center_px[1]/canvas_size*100:.1f}%" r="45%">',
        '      <stop offset="0%" stop-color="#FF0D38" stop-opacity="0.16"/>',
        '      <stop offset="50%" stop-color="#FF0D38" stop-opacity="0.05"/>',
        '      <stop offset="100%" stop-color="#050508" stop-opacity="0"/>',
        '    </radialGradient>',
        '    <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">',
        '      <feGaussianBlur stdDeviation="2" result="blur"/>',
        '      <feMerge>',
        '        <feMergeNode in="blur"/>',
        '        <feMergeNode in="SourceGraphic"/>',
        '      </feMerge>',
        '    </filter>',
        '  </defs>',
        f'  <rect width="{canvas_size}" height="{canvas_size}" fill="#050508"/>',
        f'  <circle cx="{heart_center_px[0]}" cy="{heart_center_px[1]}" r="{int(glow_radius)}" fill="url(#heartAura)"/>',
        '  <g id="heart-qr-modules" filter="url(#subtleGlow)">'
    ]

    for m in module_data:
        x = m["x"]
        y = m["y"]
        sz = m["size"]
        if m["isFinder"]:
            svg_lines.append(f'    <rect x="{x}" y="{y}" width="{sz}" height="{sz}" fill="#FF0C23"/>')
        else:
            pad = 2
            svg_lines.append(f'    <rect x="{x+pad}" y="{y+pad}" width="{sz-pad*2}" height="{sz-pad*2}" fill="#FF0C23"/>')
            core_pad = 6
            svg_lines.append(f'    <rect x="{x+core_pad}" y="{y+core_pad}" width="{sz-core_pad*2}" height="{sz-core_pad*2}" fill="#FF4D6D"/>')

    svg_lines.append('  </g>')
    svg_lines.append('</svg>')

    with open(SVG_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(svg_lines))
    print(f"[+] Saved scalable SVG: {SVG_PATH}")

    # =========================================================
    # SAVE JSON FOR REACT ANIMATION
    # =========================================================
    # Sort modules by distance from center for circular progressive illumination
    module_data.sort(key=lambda m: (m["distFromCenter"], m["r"], m["c"]))
    json_payload = {
        "targetUrl": TARGET_URL,
        "gridSize": GRID_SIZE,
        "canvasSize": canvas_size,
        "boxSize": box,
        "offset": offset,
        "totalModules": len(module_data),
        "qrCenter": {"cx": cx, "cy": cy, "px": heart_center_px},
        "modules": module_data
    }
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(json_payload, f)
    print(f"[+] Saved matrix JSON: {JSON_PATH} ({len(module_data)} modules)")

    # =========================================================
    # VERIFICATION & SCAN VALIDATION SUITE
    # =========================================================
    print("\n" + "=" * 60)
    print("VERIFICATION & VALIDATION SUITE")
    print("=" * 60)

    cv_img = cv2.imread(PNG_PATH)
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
    test_sizes = [1200, 800, 600, 450, 350]
    multi_res_all_pass = True
    print("\n3. Phone Camera Screen-Distance Resizing Tests:")
    for sz in test_sizes:
        res_inv = cv2.resize(inv, (sz, sz), interpolation=cv2.INTER_AREA)
        r = decode(res_inv)
        ok = len(r) > 0 and r[0].data.decode("utf-8") == TARGET_URL
        if not ok:
            multi_res_all_pass = False
        print(f"   - Downscale to {sz}x{sz}px: {'[PASSED]' if ok else '[FAILED]'}")

    # 4. Camera Out-of-focus blur test
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
    generate_heart_qr()
