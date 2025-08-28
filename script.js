async function startPayment() {
  try {
    // Backend se order create karo
    const res = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 70 })
    });

    const order = await res.json();
    console.log("Order created:", order);

    // Razorpay Checkout open karo
    var options = {
      key: "rzp_live_R9vO4222DeaOxA", // 👈 apna Razorpay Key ID yaha dal
      amount: order.amount,
      currency: "INR",
      name: "Exam Notes Hub",
      description: "Buy Notes",
      order_id: order.id,
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Student",
        email: "student@example.com",
        contact: "9999999999"
      },
      theme: { color: "#3399cc" }
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
  } catch (err) {
    console.error("Payment Error:", err);
    alert("Something went wrong!");
  }
}

document.getElementById("shareBtn").addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Exam Notes Hub",
        text: "मैं Exam Notes Hub से सस्ते दामों में सभी प्रतियोगी परीक्षाओं की नोट्स ले रहा हूँ, आप भी देखो 📚🔥",
        url: window.location.href
      });
      console.log("✅ Shared successfully");
    } catch (err) {
      console.log("❌ Error sharing: ", err);
    }
  } else {
    alert("Sharing not supported on this browser!");
  }
});

