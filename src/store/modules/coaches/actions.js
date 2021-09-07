export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    const response = await fetch(
      `https://vue-find-coach-31575-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    );

    if (!response.ok) {
      // error ...
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  }
};
