const tagTree = document.getElementById("tagTree");
const rootTag = {
    name: 'root',
    children: [
        {
            name: 'child1',
            children: [
                { name: 'child1-child1', data: "c1-c1 Hello" },
                { name: 'child1-child2', data: "c1-c2 JS" }
            ]
        },
        { name: 'child2', data: "c2 World" }
    ]
};

function createTagElement(tagData) {
    const tagElement = document.createElement("div");
    tagElement.classList.add("tag");

    const header = document.createElement("div");
    header.classList.add("tag-header");

    const collapseButton = document.createElement("span");
    collapseButton.classList.add("collapse-button");
    collapseButton.textContent = "v";
    collapseButton.addEventListener("click", () => {
        tagContent.style.display = tagContent.style.display === "none" ? "block" : "none";
        collapseButton.textContent = tagContent.style.display === "none" ? ">" : "v";
    });

    const nameHeader = document.createElement("div");
    nameHeader.classList.add("tag-name");
    nameHeader.textContent = tagData.name;
    nameHeader.addEventListener("click", () => {
        editTagName(nameHeader, tagData);
    });

    const addChildButton = document.createElement("button");
    addChildButton.textContent = "Add Child";
    addChildButton.classList.add("add-button");
    addChildButton.addEventListener("click", () => {
        const newChild = { name: "New Child", data: "Data" };
        if (!tagData.children) {
            tagData.children = [];
        }
        tagData.children.push(newChild);
        renderTagTree(rootTag, tagTree);
    });

    header.appendChild(collapseButton);
    header.appendChild(nameHeader);
    header.appendChild(addChildButton);

    const tagContent = document.createElement("div");
    tagContent.classList.add("tag-content");
    tagContent.style.display = "block";

    if (tagData.data !== undefined) {
        const dataContainer = document.createElement("div");
        dataContainer.classList.add("data-container");

        const dataFixed = document.createElement("div");
        dataFixed.classList.add("data-fixed");
        dataFixed.textContent = "Data";

        const dataInput = document.createElement("input");
        dataInput.type = "text";
        dataInput.value = tagData.data;
        dataInput.addEventListener("input", () => {
            tagData.data = dataInput.value;
        });

        dataContainer.appendChild(dataFixed);
        dataContainer.appendChild(dataInput);

        tagContent.appendChild(dataContainer);
    }

    tagElement.appendChild(header);
    tagElement.appendChild(tagContent);

    if (tagData.children) {
        for (const child of tagData.children) {
            const childContent = document.createElement("div");
            tagContent.appendChild(childContent);
            renderTagTree(child, childContent);
        }
    }

    return tagElement;
}

function editTagName(nameHeader, tagData) {
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = tagData.name;
    nameInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            tagData.name = nameInput.value;
            nameHeader.textContent = nameInput.value;
            nameInput.replaceWith(nameHeader);
        }
    });
    nameHeader.replaceWith(nameInput);
    nameInput.focus();
}

function renderTagTree(tagData, parentElement) {
    parentElement.innerHTML = ""; // Clear the existing content
    const tagElement = createTagElement(tagData);
    parentElement.appendChild(tagElement);
}

renderTagTree(rootTag, tagTree);

const exportButton = document.getElementById("exportButton");
exportButton.addEventListener("click", () => {
    const exportedData = JSON.stringify(rootTag, ["name", "children", "data"], 2);
    const exportedDataElement = document.getElementById("exportedData");
    exportedDataElement.textContent = exportedData;
});
