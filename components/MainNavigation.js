import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import UpgradeModal from "./UpgradeModal";
import { useTheme } from "../contexts/ThemeContext";

export default function MainNavigation({
  activeNav,
  setActiveNav,
  isMessageBoxOpen,
  setIsMessageBoxOpen,
}) {
  const avatar = useSelector((state) => state.avatar);
  const { theme, isDark, toggleTheme } = useTheme();

  const navItems = [
    { id: "home", icon: "🏠", label: "主页", href: "/" },
    {
      id: "workspace",
      icon: "💼",
      label: "工作空间",
      href: "/workspace/my-bots",
    },
    { id: "store", icon: "🏪", label: "商店", href: "/store/popular" },
    {
      id: "templates",
      icon: "📋",
      label: "模板",
      href: "/templates/recommended",
    },
    { id: "gamespace", icon: "🎮", label: "游戏区", href: "/gamespace/recent" },
  ];

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const handleToggle = () => {
    setIsMessageBoxOpen(!isMessageBoxOpen);
  };

  const bottomNavItems = [
    { id: "docs", icon: "📄", label: "文档", href: "/docs/quick-start" },
    { id: "messages", icon: "💬", label: "消息" },
    { id: "upgrade", icon: "⭐", label: "升级", href: "/upgrade" },
  ];

  return (
    <nav
      className="main-nav"
      style={{
        backgroundColor: theme.surface,
        color: theme.text.primary,
      }}
    >
      <div className="top-section">
        <div className="logo">
          <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
        </div>
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            paddingBottom: "6px",
            marginTop: "-8px",
            marginBottom: "10px",
          }}
        >
          {isDark ? "🌞" : "🌙"}
        </button>
        {navItems.map((item) => (
          <Link href={item.href} key={item.id}>
            <a
              className={activeNav === item.id ? "active" : ""}
              onClick={() => setActiveNav(item.id)}
            >
              <span>{item.icon}</span>
              <span style={{}}>{item.label}</span>
            </a>
          </Link>
        ))}
      </div>
      <div className="bottom-section">
        {bottomNavItems.map((item) => (
          <div key={item.id}>
            {item.id === "messages" ? (
              <a
                className={`bottom-nav-item ${
                  activeNav === item.id ? "active" : ""
                }`}
                onClick={handleToggle}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ) : item.id === "upgrade" ? (
              <a
                className={`bottom-nav-item ${
                  activeNav === item.id ? "active" : ""
                }`}
                onClick={() => setIsUpgradeModalOpen(true)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ) : (
              <Link href={item.href}>
                <a
                  className={`bottom-nav-item ${
                    activeNav === item.id ? "active" : ""
                  }`}
                  onClick={() => setActiveNav(item.id)}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              </Link>
            )}
          </div>
        ))}
        <Link href="/profile-settings">
          <div className="avatar cursor-pointer">
            <Image
              src={avatar}
              alt="Avatar"
              width={40}
              height={40}
              style={{ borderRadius: "10px" }}
            />
          </div>
        </Link>
      </div>

      <div
        className={`message-box-overlay ${isMessageBoxOpen ? "open" : ""}`}
        onClick={() => setIsMessageBoxOpen(false)}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div
          className={`message-box ${isMessageBoxOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: theme.surface,
            color: theme.text.primary,
          }}
        >
          <button className="close-button" onClick={handleToggle}>
            ×
          </button>
          <h3 style={{ color: theme.text.primary }}>消息</h3>
          <div className="message-content">
            {[
              {
                sender: "系统",
                icon: "🎉",
                time: "10:00 AM",
                body: "欢迎回来！今天是美好的一天，准备好大展身手了吗？",
              },
              {
                sender: "支持团队",
                icon: "🚀",
                time: "11:30 AM",
                body: "嘿！有什么我们可以帮到你的吗？别客气，我们随时待命！",
              },
              {
                sender: "系统",
                icon: "🌟",
                time: "2:15 PM",
                body: "哇哦！你有一个新的激动人心的任务等待处理。快来看看是什么吧！",
              },
              {
                sender: "小助手",
                icon: "🤖",
                time: "4:45 PM",
                body: "今日趣闻：你知道吗？程序员最喜欢的饮料是Java☕！",
              },
            ].map((message, index) => (
              <div
                key={index}
                className="message-item"
                style={{ borderBottom: `1px solid ${theme.border}` }}
              >
                <div className="message-header">
                  <span
                    className="sender"
                    style={{ color: theme.text.primary }}
                  >
                    <span className="icon">{message.icon}</span>
                    {message.sender}
                  </span>
                  <span className="time" style={{ color: theme.text.tertiary }}>
                    {message.time}
                  </span>
                </div>
                <div
                  className="message-body"
                  style={{ color: theme.text.secondary }}
                >
                  {message.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .main-nav {
          width: 80px;
          min-width: 80px;
          background-color: #f8f8f8;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 0;
          height: 100vh;
        }
        .top-section {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .bottom-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: auto;
          padding-bottom: 60px;
        }
        .logo,
        .add-button,
        a,
        .bottom-nav-item,
        .avatar {
          margin-bottom: 14px;
        }
        .add-button {
          background: none;
          font-size: 20px;
          cursor: pointer;
          border: none;
        }
        a,
        .bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: ${isDark ? "#78767A" : theme.text.primary};
          text-decoration: none;
          cursor: pointer;
        }
        .active {
          color: ${isDark ? "#e0e0e0" : theme.primary};
        }
        .cursor-pointer {
          cursor: pointer;
        }

        .message-box {
          position: fixed;
          left: 110px;
          bottom: 20px;
          width: 30vw;
          background-color: white;
          border-radius: 15px;
          box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1),
            0 5px 20px rgba(0, 0, 0, 0.1);
          padding: 20px;
          transform: translateY(120%);
          transition: transform 0.3s ease-in-out;
          z-index: 1000;
        }
        .message-box.open {
          transform: translateY(0);
        }
        .message-box h3 {
          margin-top: 0;
          margin-bottom: 15px;
          color: #333;
          font-size: 18px;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #999;
        }
        .message-content {
          height: auto;
          overflow-y: auto;
        }
        .message-item {
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
          transition: background-color 0.3s ease;
        }
        .message-item:hover {
          background-color: ${theme.input.background};
          cursor: pointer;
        }
        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
          font-size: 0.9em;
        }
        .sender {
          font-weight: bold;
          color: #333;
          display: flex;
          align-items: center;
        }
        .icon {
          margin-right: 5px;
          font-size: 1.2em;
        }
        .time {
          color: #999;
        }
        .message-body {
          font-size: 0.95em;
          color: #666;
          line-height: 1.4;
        }
      `}</style>

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onRequestClose={() => setIsUpgradeModalOpen(false)}
      />
    </nav>
  );
}
