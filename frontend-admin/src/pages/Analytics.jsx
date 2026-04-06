import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import Charts from "../components/Charts";

export default function Analytics() {

  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchTrends = async () => {
      try {
    
        const res = await api.get("analytics/trends");

        console.log("BACKEND TREND RESPONSE:", res.data);

        // ⭐ IMPORTANT: map EXACT backend keys
        const formatted = res.data.map((item) => ({
          day: item.day,
          negative: item.negative
        }));

        setTrendData(formatted);
        setLoading(false);

      } catch (err) {
        console.log("Trend fetch error:", err);
      }
    };
   {!loading && trendData.length === 0 && (
  <p>No data available</p>
)}
    fetchTrends();

  }, []);

  return (
    <Layout>
      <div style={{ padding: 40 }}>

        <h1>
          Analytics Trends 📈
        </h1>

        {loading && <p>Loading trends...</p>}

        {!loading && trendData.length > 0 && (
          <Charts data={trendData} />
        )}

      </div>
    </Layout>
  );
}
