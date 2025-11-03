let botRunning = false;

const getStatus = () => ({
  running: botRunning,
  message: botRunning ? "البوت يعمل الآن ✅" : "البوت متوقف ❌",
});

const runTask = async (taskData) => {
  botRunning = true;
  // هنا منطق البوت لتحليل التعليقات والردود
  console.log("Running bot task with data:", taskData);

  // محاكاة مهمة البوت
  await new Promise((resolve) => setTimeout(resolve, 2000));
  botRunning = false;

  return { success: true, message: "تم تنفيذ المهمة" };
};

export default { getStatus, runTask };
