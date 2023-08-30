import ReactGA from "react-ga";

export const initGA = (id) => {
    ReactGA.initialize(id);
};

export const logPageView = () => {
    ReactGA.send({ hitType: "pageview", page: "/", title: "ReadFaster" });
}