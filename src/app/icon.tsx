import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          background: "#171126",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#D6BD8B",
          borderRadius: "50%",
          border: "2px solid #D6BD8B",
        }}
      >
        A
      </div>
    ),
    {
      ...size,
    }
  );
}
