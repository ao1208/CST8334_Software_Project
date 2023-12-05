export const formatNumber = (number) => {

    // Check if the number is not null before formatting
    if (number !== null && typeof number !== 'undefined') {
        const formattedNumber = number.toLocaleString("en-US", {
            style: "currency",
            currency: "CAD",
            minimumFractionDigits: 2,
        });
        return formattedNumber.replace("CA", "");
    } else {
        // Handle the case where the number is null or undefined
        return 'N/A'; // or any other default value or message you want
    }
};
