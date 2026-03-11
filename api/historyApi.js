async function saveConversation(resultHistory) {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(resultHistory)
        }
    );

    if (!res.ok) {
        throw new Error("could not fetch")
    }

    let result = await res.json();

    // console.log("saved successfully:", result);

    return result;

}

export default saveConversation;