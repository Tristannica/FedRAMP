document.addEventListener('DOMContentLoaded', function() {
    const controlsContainer = document.getElementById('controls-container');
    const data = controls; // Assuming `controls.json` is the variable containing your JSON data

    Object.keys(data).forEach(family => {
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';

        const button = document.createElement('button');
        button.innerText = family;
        button.onclick = function() {
            this.nextElementSibling.classList.toggle("show");
        };

        const dropdownContent = document.createElement('div');
        dropdownContent.className = 'dropdown-content';

        data[family].forEach(control => {
            const a = document.createElement('a');
            a.href = '#';
            a.innerText = `${control.ID}: ${control['Control Name']}`;
            dropdownContent.appendChild(a);
        });

        dropdown.appendChild(button);
        dropdown.appendChild(dropdownContent);
        controlsContainer.appendChild(dropdown);
    });
});

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropdown button')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
