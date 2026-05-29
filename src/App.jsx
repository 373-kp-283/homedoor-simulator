import { useState, useMemo } from "react";

function App() {
  // ホームドア状態
  const [isOpen, setIsOpen] = useState(false);

  // 操作盤表示状態
  const [consoleOpen, setConsoleOpen] = useState(false);

  // 音声
  const openSound = useMemo(
    () => new Audio("/sounds/open.wav"),
    []
  );

  const closeSound = useMemo(
    () => new Audio("/sounds/close.wav"),
    []
  );

  // 開操作
  const handleOpen = () => {
    // ホームドア即開
    setIsOpen(true);

    openSound.currentTime = 0;
    openSound.play();

    // 0.3秒後に操作盤表示切替
    setTimeout(() => {
      setConsoleOpen(true);
    }, 300);
  };

  // 閉操作
  const handleClose = () => {
    // ホームドア即閉
    setIsOpen(false);

    closeSound.currentTime = 0;
    closeSound.play();

    // 4.2秒後に操作盤表示切替
    setTimeout(() => {
      setConsoleOpen(false);
    }, 4200);
  };

  return (
    <div
      style={{
        backgroundColor: "#222",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        仮想ホームドアシミュレータ
      </h1>

      {/* iPhone16横向き比率の表示エリア */}
      <div
        style={{
          position: "relative",

          width: "100%",
          maxWidth: "1000px",

          aspectRatio: "19.5 / 9",

          overflow: "hidden",

          border: "4px solid #555",
          borderRadius: "20px",

          backgroundColor: "black",

          boxShadow: "0 0 40px rgba(0,0,0,0.8)",
        }}
      >
        {/* ホームドアエリア */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {/* 電車 */}
          <img
            src={
              isOpen
                ? "/images/train-open.png"
                : "/images/train-close.png"
            }
            alt="電車"
            style={{
              width: "120%",
              display: "block",

              marginTop: "-140px",
              marginLeft: "-130px",
            }}
          />

          {/* ホームドア */}
          <img
            src={
              isOpen
                ? "/images/homedoor-open.png"
                : "/images/homedoor-close.png"
            }
            alt="ホームドア"
            style={{
              position: "absolute",
              top: "-40px",
              left: 0,
              width: "100%",
            }}
          />
        </div>

        {/* 操作盤 */}
        <div
          style={{
            position: "absolute",

            width: "70%",
            maxWidth: "700px",

            height: "180px",

            overflow: "hidden",

            bottom: "-40px",
            left: "50%",
            transform: "translateX(-50%)",

            zIndex: 10,
          }}
        >
          {/* 操作盤画像 */}
          <img
            src={
              consoleOpen
                ? "/images/console-open.png"
                : "/images/console-close.png"
            }
            alt="操作盤"
            style={{
              width: "100%",
              display: "block",

              marginTop: "-40px",
            }}
          />

          {/* 開ボタン */}
          <div
            onClick={handleOpen}
            style={{
              position: "absolute",
              top: "43%",
              left: "20%",

              width: "29px",
              height: "29px",

              cursor: "pointer",

              // デバッグ用
              // backgroundColor: "rgba(255,0,0,0.3)",
            }}
          />

          {/* 閉ボタン */}
          <div
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "43%",
              left: "25%",

              width: "29px",
              height: "29px",

              cursor: "pointer",

              // デバッグ用
              // backgroundColor: "rgba(0,255,0,0.3)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;