import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {  Button, Stack, Typography } from "@mui/material";
import exportAsImage from "./exportAsImage";
import { toast } from "react-toastify";

Canva.propTypes = {
  name: PropTypes.string,
};

export default function Canva({ name }) {
  const exportRef = useRef();
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = document.querySelector("canvas").getContext("2d");
    canvas.width = 800;
    canvas.height = 1014;
    const img = new Image();
    // const img1 = new Image();
    img.src = "/assets/vbsCert26.jpeg";
    // img1.src ='/assets/vol1_02.jpg'
    console.log("Img", img);
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 800, 1014);
      //  ctx.drawImage(img1, 0, 0,550,850);
      ctx.font = "30px Verdana";
      ctx.textAlign = "center";
      ctx.fillStyle = "#000000";
      ctx.fillText(
        name,
   390 - ctx.measureText(name).width * (1 / ctx.measureText(name).width),
      515
      ); // THIS IS THE PLACE TEXT IS EMBEDDED INTO THE PICTURE
    };
  }, [name]);

  /* eslint lines-between-class-members: ["error", "never"] */

  return (
    <>
      <Stack>
        <Typography sx={{ typography: "h4", textAlign: "center" }}>
          Certificate for {name}
        </Typography>
        <div ref={exportRef}>
          <canvas ref={canvasRef}  width={800}  height={1014}  />
          {/* <img
           ref={canvasRef}
          alt="Stackoverflow56203352"
          src={backImg}
         style={{zIndex: -1}}
        /> */}
        </div>
      </Stack>
      <Button
        varient="outlined"
        color="success"
        size="large"
        onClick={() => {
          exportAsImage(exportRef.current, `${name}`);
          console.log("ref", exportRef.current);
          toast.success("Downloading...");
        }}
      >
        Download Certificate for {name}
      </Button>
    </>
  );
}
