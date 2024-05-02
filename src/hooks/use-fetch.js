const useFetch = async (url, requestBody) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const options = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(requestBody),
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        return jsonData.jdList;
    } catch (err) {
        console.error(err);
    }

}

export default useFetch;
