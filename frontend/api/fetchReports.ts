export const fetchReports = {
  getReport: async (
    setIsSuccess: (status: boolean) => void,
    size: number,
    withErrors?: string,
    maxSpend?: string
  ) => {
    try {
      const res = await fetch(
        `http://localhost:3000/report?size=${size}${
          withErrors ? `&withErrors=${withErrors}` : ""
        }${maxSpend ? `&maxSpend=${maxSpend}` : ""}`
      );

      if (!res.ok) {
        setIsSuccess(false);
        return;
      }
      setIsSuccess(true);
      return await res.blob();
    } catch (e) {
      setIsSuccess(false);
    }
  },
};
