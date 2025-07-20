
const apiKey = "GJSY9KUAILF51AR";
const recommendationBox = document.getElementById("recommendation");
const timeBox = document.getElementById("last-update");

async function fetchRecommendation() {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=RSI&symbol=EURUSD&interval=1min&time_period=10&series_type=close&apikey=${apiKey}`);
        const data = await response.json();
        const rsiData = data["Technical Analysis: RSI"];
        const latestTime = Object.keys(rsiData)[0];
        const latestRSI = parseFloat(rsiData[latestTime]["RSI"]);

        let recommendation = "🚫 لا يوجد توصية حالياً";
        if (latestRSI < 30) {
            recommendation = "🟢 شراء EUR/USD (RSI منخفض)";
        } else if (latestRSI > 70) {
            recommendation = "🔴 بيع EUR/USD (RSI مرتفع)";
        } else {
            recommendation = "⚪️ انتظر – السوق متوازن حاليًا";
        }

        recommendationBox.innerText = recommendation;
        timeBox.innerText = "آخر تحديث: " + new Date().toLocaleTimeString();
    } catch (error) {
        recommendationBox.innerText = "حدث خطأ أثناء جلب التوصية";
    }
}

// أول مرة
fetchRecommendation();
// كل 60 ثانية
setInterval(fetchRecommendation, 60000);
