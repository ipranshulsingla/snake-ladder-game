import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

export type DrawBag = { ctx: CanvasRenderingContext2D; frameCount: number; t: number };

let widthPx = 0,
  heightPx = 0;

export type CanvasProps = {
  draw?: (bag: DrawBag) => void;
  width: number;
  height: number;
} & Omit<React.ComponentPropsWithRef<"canvas">, "width" | "height">;

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ draw, width = 400, height = 400, ...props }: CanvasProps, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useImperativeHandle(
      ref,
      () => {
        return canvasRef.current as HTMLCanvasElement;
      },
      []
    );

    useEffect(() => {
      if (!canvasRef.current) return;

      const ctx = canvasRef.current.getContext("2d");

      let animationFrameId: number;
      let frameCount = 0;

      const render = (t: number) => {
        if (ctx) {
          ctx.clearRect(0, 0, widthPx, heightPx);
          ++frameCount;
          draw?.({ ctx, frameCount, t });
        }

        animationFrameId = window.requestAnimationFrame(render);
      };

      animationFrameId = window.requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }, [draw]);

    useEffect(() => {
      const resizeCanvas = () => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext("2d");
        ctx?.clearRect(0, 0, widthPx, heightPx);

        widthPx = width * devicePixelRatio;
        heightPx = height * devicePixelRatio;

        canvasRef.current.width = widthPx;
        canvasRef.current.height = heightPx;
      };

      window.addEventListener("resize", resizeCanvas);
      window.addEventListener("orientationchange", resizeCanvas);
      window.addEventListener("deviceorientation", resizeCanvas);

      resizeCanvas();

      return () => {
        window.removeEventListener("resize", resizeCanvas);
        window.removeEventListener("orientationchange", resizeCanvas);
        window.removeEventListener("deviceorientation", resizeCanvas);
      };
    }, [width, height]);

    return <canvas ref={canvasRef} {...props} style={{ width, height }} />;
  }
);

export default Canvas;
