async function tryThis() {
    try {
        const res = await fetch(URL, {
            method: "POST",
            headers: {
                "Content": "aplication/json"
            },
            body: JSON.stringify()
        })

        if (!res.ok) {
            throw new Error("could not access url:", Error);
        }

        const result = await res.json();
        // console.log(result)

        let bag = document.querySelector("#bagDiv");

        if (!bag) {
            console.log("no div called bagDiv");
            return;
        }

        bag.innerHTML = ""

        if (result.isArray) {
            (result.forEach(element => {
                const div = document.createElement('div');

               div.textContent = (`${element.amount}, ${element.from}, ${element.to}, ${element.rate} `)
               return respones;

            }))

        bag.appendChild(result);
        };


    } catch (error) {
        console.log("couldnt add new dats to url");
    }

}

export default tryThis;