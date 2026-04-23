export const statesData = {
  CA: { name: "California", deadline: "15 days before election", sameDay: true, link: "https://registertovote.ca.gov/" },
  TX: { name: "Texas", deadline: "30 days before election", sameDay: false, link: "https://www.votetexas.gov/register-to-vote/" },
  NY: { name: "New York", deadline: "10 days before election", sameDay: false, link: "https://elections.ny.gov/" },
  FL: { name: "Florida", deadline: "29 days before election", sameDay: false, link: "https://registertovoteflorida.gov/" },
  OH: { name: "Ohio", deadline: "30 days before election", sameDay: false, link: "https://olvr.ohiosos.gov/" }
  // (MVP mockup: in a full production version, all 50 states would be listed here)
};

export const timingOptions = [
  { id: "months", label: "A few months away", level: "green" },
  { id: "weeks", label: "A few weeks away", level: "yellow" },
  { id: "days", label: "Very soon (days)", level: "red" },
  { id: "past", label: "It already happened", level: "grey" }
];

export const stepsData = [
  { id: 1, title: "Check Eligibility", description: "Ensure you meet the age, citizenship, and residency requirements." },
  { id: 2, title: "Register to Vote", description: "Most states require you to register well before Election Day." },
  { id: 3, title: "Understand Your Ballot", description: "Learn about the candidates and measures you'll be voting on." },
  { id: 4, title: "Choose How to Vote", description: "Decide whether to vote in-person, early, or by mail." },
  { id: 5, title: "Cast Your Vote", description: "Bring necessary ID if required, and submit your ballot." },
  { id: 6, title: "Track Your Vote & Results", description: "Ensure your vote was counted and check the certified results." }
];
