// getMessageBySeniorCitizen
addEventListener("getMessageBySeniorCitizen", async (resolve, reject, args) => {
  try {
    const interval = setInterval(async () => {
      const res = await fetch("https://randomuser.me/api/");
      if (!res.ok) {
        throw new Error("Could not fetch user");
      }
      const result = await res.json();
      if (result["results"][0]?.dob?.age > 60) {
        let scheduleDate = new Date();
        scheduleDate.setSeconds(scheduleDate.getSeconds() + 1);
        CapacitorNotifications.schedule([
          {
            id: result["results"][0]?.dob?.age,
            title: `${result["results"][0]?.name?.first} ${result["results"][0]?.name?.last}`,
            body: `${result["results"][0]?.location?.timezone?.description}`,
            scheduleAt: scheduleDate,
          },
        ]);
        resolve(result["results"][0]);
        clearInterval(interval);
      }
    }, 2000);
  } catch (err) {
    console.error(err);
    reject(err);
  }
});
