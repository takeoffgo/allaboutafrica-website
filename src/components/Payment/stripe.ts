const stripeConfig: { [key: string]: string } = {
  "www.takeoffgo.com": "pk_live_5DIChTOisCE5BE00zAxhagIX",
  default: "pk_test_bSdrqcnKSDNxExRP0B5ErFbt",
};

type StripeTokenRequest = {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
};

const handleErrors = (res: Response) => {
  if (res.ok) {
    return res;
  } else {
    return res.json().then((err: any) => {
      throw err;
    });
  }
};

export const stripeToken = async (state: StripeTokenRequest) => {
  const data: any = {
    "card[name]": state.name,
    "card[number]": state.number,
    "card[exp_month]": state.expiry.split("/")[0],
    "card[exp_year]": `20${state.expiry.split("/")[1]}`,
    "card[cvc]": state.cvc,
  };

  const stripeKey = stripeConfig[window.location.host] || stripeConfig.default;

  const request = {
    headers: {
      Authorization: `Bearer ${stripeKey}`,
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
    method: "POST",
    body: Object.keys(data)
      .map((key) => `${key}=${encodeURIComponent(data[key])}`)
      .join("&"),
  };

  const res = await fetch("https://api.stripe.com/v1/tokens", request)
    .then(handleErrors)
    .then((res) => res.json() as any);
  console.log("res", res);
  return res.id;
};
