import ReactGA from "react-ga4";

export const initGA = (id) => {
    if (process.env.NODE_ENV === "production") {
        ReactGA.initialize(id);
    }
};

export const logPageView = () => {
    ReactGA.send({ hitType: "pageview", page: "/", title: "ReadFaster" });
}