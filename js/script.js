{
	const buttonClear = document.querySelector(".js-buttonClear");
	const form = document.querySelector(".js-form");
	const result = document.querySelector(".js-result");
	const amountIn = document.querySelector(".js-form__input");
	const error = document.querySelector(".js-form__errorText");
	const currencyIn = document.querySelector(".js-form__currency--in");
	const currencyOut = document.querySelector(".js-form__currency--out");

	const showError = () => {
		error.classList.add("error");
		amountIn.classList.add("inputColor");
		result.classList.remove("showResult");
	};

	const count = () => {
		if (amountIn.value === "") {
			showError();
		} else if (amountIn.value <= 0) {
			showError();
			error.innerText = "Podaj kwotę dodatnią!";
		} else {
			result.classList.add("showResult");

			const selectedValueIn = currencyIn.value;
			const selectedValueOut = currencyOut.value;

			const amount = +amountIn.value;

			const resultForPLN = (amount, selectedValueOut) => {
				const PLNtoEUR = 4.4762;
				const PLNtoGBP = 5.2093;
				const PLNtoUSD = 4.141;

				switch (selectedValueOut) {
					case "EUR":
						return (amount / PLNtoEUR).toFixed(4);

					case "GBP":
						return (amount / PLNtoGBP).toFixed(4);

					case "USD":
						return (amount / PLNtoUSD).toFixed(4);

					case "PLN":
						return amount;
				}
			};

			const resultForEUR = (amount, selectedValueOut) => {
				const EURtoPLN = 0.2234;
				const EURtoGBP = 1.1639;
				const EURtoUSD = 0.9251;

				switch (selectedValueOut) {
					case "PLN":
						return (amount / EURtoPLN).toFixed(4);

					case "GBP":
						return (amount / EURtoGBP).toFixed(4);

					case "USD":
						return (amount / EURtoUSD).toFixed(4);

					case "EUR":
						return amount;
				}
			};

			const resultForGBP = (amount, selectedValueOut) => {
				const GBPtoPLN = 0.192;
				const GBPtoEUR = 0.8591;
				const GBPtoUSD = 0.7947;

				switch (selectedValueOut) {
					case "PLN":
						return (amount / GBPtoPLN).toFixed(4);

					case "EUR":
						return (amount / GBPtoEUR).toFixed(4);

					case "USD":
						return (amount / GBPtoUSD).toFixed(4);

					case "GBP":
						return amount;
				}
			};

			const resultForUSD = (amount, selectedValueOut) => {
				const USDtoPLN = 0.2415;
				const USDtoEUR = 1.0811;
				const USDtoGBP = 1.2584;

				switch (selectedValueOut) {
					case "PLN":
						return (amount / USDtoPLN).toFixed(4);

					case "EUR":
						return (amount / USDtoEUR).toFixed(4);

					case "GBP":
						return (amount / USDtoGBP).toFixed(4);

					case "USD":
						return amount;
				}
			};

			if (selectedValueIn === "PLN") {
				return resultForPLN(amount, selectedValueOut);
			} else if (selectedValueIn === "EUR") {
				return resultForEUR(amount, selectedValueOut);
			} else if (selectedValueIn === "GBP") {
				return resultForGBP(amount, selectedValueOut);
			} else if (selectedValueIn === "USD") {
				return resultForUSD(amount, selectedValueOut);
			}
		}
	};

	form.addEventListener("submit", (event) => {
		event.preventDefault();

		let amountOut = count();

		result.innerText = `${amountIn.value} ${currencyIn.value} = ${amountOut} ${currencyOut.value}`;
	});

	const removeError = () => {
		amountIn.value = "";
		error.classList.remove("error");
		amountIn.classList.remove("inputColor");
		error.innerText = "Musisz podać kwotę";
	};

	const clearInput = () => {
		if (amountIn.classList.contains("inputColor")) {
			removeError();
		}
	};

	amountIn.addEventListener("mouseover", clearInput);

	const clearForm = (event) => {
		event.preventDefault();
		result.classList.remove("showResult");
		currencyIn.value = "PLN";
		currencyOut.value = "EUR";
		removeError();
	};

	buttonClear.addEventListener("click", clearForm);
}
