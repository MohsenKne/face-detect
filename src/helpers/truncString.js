const truncString = (string, n = 30, compeleteTerm = false) => {
  if (typeof string === "string") {
    return string?.length <= n
      ? string
      : `${
          compeleteTerm
            ? string
                ?.substr(0, n - 1)
                ?.substr(0, string?.substr(0, n - 1)?.lastIndexOf(" "))
            : string?.substr(0, n - 1)
        }...`;
  } else {
    return "";
  }
};

export { truncString };
