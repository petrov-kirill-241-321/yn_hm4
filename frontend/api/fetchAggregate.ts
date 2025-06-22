import type { TableData } from "../store/TableStore";

export const fetchAggregate = {
  getAggregate: async (
    file: File,
    rows: number,
    onData: (obj: any) => void,
    updateTable: (table: TableData) => void,
    setIsSuccess: (status: boolean) => void
  ) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`http://localhost:3000/aggregate?rows=${rows}`, {
      method: "POST",
      body: formData,
    });

    if (!res.body) throw new Error("Response body is empty");

    if (!res.ok) {
      setIsSuccess(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        setIsSuccess(true);
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || ""; // Последняя строка может быть неполной

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const obj = JSON.parse(line);
          onData(obj);
          // 🟢 передаём результат в колбэк
          updateTable(obj);
        } catch (err) {
          console.error("❌ Failed to parse JSON:", err, "Line:", line);
        }
      }
    }

    // финальная строка
    if (buffer.trim()) {
      try {
        const obj = JSON.parse(buffer);
        onData(obj); // 🟢 финальный результат
      } catch (err) {
        console.error("❌ Final JSON parse error:", err);
      }
    }
  },
};
