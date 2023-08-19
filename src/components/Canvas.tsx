import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

export type DrawBag = { ctx: CanvasRenderingContext2D; frameCount: number; t: number };

export type CanvasProps = {
  draw?: (bag: DrawBag) => void;
} & React.ComponentPropsWithRef<"canvas">;

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(({ draw, ...props }: CanvasProps, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useImperativeHandle(
    ref,
    () => {
      return canvasRef.current as HTMLCanvasElement;
    },
    []
  );

  useEffect(() => {
    const resizeCanvas = () => {
      if (!canvasRef.current) return;

      const { height, width } = canvasRef.current.getBoundingClientRect();

      canvasRef.current.width = width * devicePixelRatio;
      canvasRef.current.height = height * devicePixelRatio;
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
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    const { height, width } = canvasRef.current;

    let animationFrameId: number;
    let frameCount = 0;

    const render = (t: number) => {
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
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

  return <canvas ref={canvasRef} {...props} />;
});

export default Canvas;
