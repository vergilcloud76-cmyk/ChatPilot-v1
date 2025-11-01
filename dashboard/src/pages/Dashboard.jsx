import React from "react";
import RuleManager from "../components/RuleManager";
import MessageLog from "../components/MessageLog";

export default function Dashboard() {
  return (
    <div>
      <h1>لوحة التحكم</h1>
      <RuleManager />
      <MessageLog />
    </div>
  );
}
