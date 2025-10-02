import DockNavigation from "./DockNavigation";
import PixelBlast from "./PixelBlast";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen relative" style={{ margin: 0, padding: 0 }}>
      {/* PixelBlast background effect - Interactive purple particle system */}
      <div
        className="fixed z-0"
        style={{
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 0,
          padding: 0,
          position: "fixed"
        }}>
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10" style={{ pointerEvents: "none" }}>
        <main className="pt-8 pb-32 px-4">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Floating dock navigation */}
      <DockNavigation />
    </div>
  );
};

export default Layout;