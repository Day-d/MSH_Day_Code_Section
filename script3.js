document.addEventListener('DOMContentLoaded', () => {
    const packagesGrid = document.querySelector('.packages-grid');
    const editFormContainer = document.querySelector('.edit-form-container');
    const previewImage = document.getElementById('preview-image');
    const uploadPlaceholder = document.getElementById('upload-placeholder');
    const imageUploadInput = document.getElementById('image-upload');
    const triggerImageUploadButton = document.getElementById('trigger-image-upload');
    const packageNameInput = document.getElementById('package-name');
    const packageCaptionInput = document.getElementById('package-caption');
    const packagePriceInput = document.getElementById('package-price');
    const saveChangesButton = document.getElementById('save-changes');
    const cancelEditButton = document.getElementById('cancel-edit');

    // Background Modal Elements
    const openBackgroundModalBtn = document.getElementById('open-background-modal');
    const backgroundModal = document.getElementById('background-modal');
    const closeBackgroundModalBtn = document.getElementById('close-background-modal');
    const previewBackgroundImage = document.getElementById('preview-background-image');
    const uploadBackgroundPlaceholder = document.getElementById('upload-background-placeholder');
    const backgroundImageUploadInput = document.getElementById('background-image-upload');
    const triggerBackgroundImageUploadButton = document.getElementById('trigger-background-image-upload');
    const saveBackgroundChangesButton = document.getElementById('save-background-changes');
    const cancelBackgroundChangesButton = document.getElementById('cancel-background-changes');
    const bodyElement = document.body; // Reference to the body element for background change

    let currentEditingCard = null; // To keep track of which card is being edited

    // Initial package data (can be fetched from a backend in a real application)
    const packagesData = [
        {
            id: 1,
            image: 'images/i2.jpg', // Placeholder image
            name: 'Adventure Explorer',
            caption: '7 days of adventure including hiking, sightseeing, and cultural experiences.',
            price: '$2,299 Per Person'
        },
        {
            id: 2,
            image: 'images/i3.jpg', // Placeholder image
            name: 'Adventure Explorer',
            caption: '7 days of adventure including hiking, sightseeing, and cultural experiences.',
            price: '$2,299 Per Person'
        },
        {
            id: 3,
            image: 'images/i1.jpg', // Placeholder image
            name: 'Adventure Explorer',
            caption: '7 days of adventure including hiking, sightseeing, and cultural experiences.',
            price: '$2,299 Per Person'
        }
    ];

    // Function to render package cards
    function renderPackages() {
        packagesGrid.innerHTML = ''; // Clear existing cards
        packagesData.forEach(pkg => {
            const card = document.createElement('div');
            card.classList.add('package-card');
            card.setAttribute('data-id', pkg.id); // Store ID for easy lookup

            card.innerHTML = `
                <img src="${pkg.image}" alt="${pkg.name}" class="package-card-image">
                <div class="edit-icon"><i class="fas fa-pencil-alt"></i></div>
                <div class="package-card-content">
                    <h3>${pkg.name}</h3>
                    <p>${pkg.caption}</p>
                    <div class="package-card-price">${pkg.price}</div>
                    <div class="package-card-actions">
                        <button class="book-now-btn">Book Now</button>
                        <a href="#" class="see-more-info">See More Info</a>
                    </div>
                </div>
            `;
            packagesGrid.appendChild(card);
        });
        attachEditListeners(); // Attach listeners after cards are rendered
    }

    // Function to attach event listeners to edit icons
    function attachEditListeners() {
        document.querySelectorAll('.edit-icon').forEach(icon => {
            icon.addEventListener('click', (event) => {
                const card = event.target.closest('.package-card');
                const packageId = parseInt(card.getAttribute('data-id'));
                const pkg = packagesData.find(p => p.id === packageId);

                if (pkg) {
                    currentEditingCard = card; // Set the current card being edited

                    // Populate the form
                    packageNameInput.value = pkg.name;
                    packageCaptionInput.value = pkg.caption;
                    packagePriceInput.value = pkg.price;

                    // Display the image in the form
                    if (pkg.image) {
                        previewImage.src = pkg.image;
                        previewImage.style.display = 'block';
                        uploadPlaceholder.style.display = 'none';
                    } else {
                        previewImage.style.display = 'none';
                        previewImage.src = ''; // Clear previous image
                        uploadPlaceholder.style.display = 'flex';
                    }

                    editFormContainer.style.display = 'block'; // Show the form
                    editFormContainer.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll to the form
                }
            });
        });
    }

    // Handle package card image upload
    triggerImageUploadButton.addEventListener('click', () => {
        imageUploadInput.click(); // Trigger the hidden file input
    });

    imageUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                uploadPlaceholder.style.display = 'none';
            };
            reader.readAsDataURL(file);
        } else {
            previewImage.style.display = 'none';
            previewImage.src = '';
            uploadPlaceholder.style.display = 'flex';
        }
    });

    // Save changes for package card
    saveChangesButton.addEventListener('click', () => {
        if (currentEditingCard) {
            const packageId = parseInt(currentEditingCard.getAttribute('data-id'));
            const pkgIndex = packagesData.findIndex(p => p.id === packageId);

            if (pkgIndex !== -1) {
                // Update data in our array
                packagesData[pkgIndex].name = packageNameInput.value;
                packagesData[pkgIndex].caption = packageCaptionInput.value;
                packagesData[pkgIndex].price = packagePriceInput.value;
                // If a new image was uploaded, update its source
                if (previewImage.src && previewImage.style.display === 'block') {
                    packagesData[pkgIndex].image = previewImage.src;
                } else {
                    // If no new image, retain the old one or set to a default placeholder
                    // For now, it will keep the old one if no new one is selected
                }

                // Update the visible card in the admin panel
                currentEditingCard.querySelector('.package-card-image').src = packagesData[pkgIndex].image;
                currentEditingCard.querySelector('h3').textContent = packagesData[pkgIndex].name;
                currentEditingCard.querySelector('p').textContent = packagesData[pkgIndex].caption;
                currentEditingCard.querySelector('.package-card-price').textContent = packagesData[pkgIndex].price;

                // Hide the form
                editFormContainer.style.display = 'none';
                currentEditingCard = null; // Reset the currently edited card
                // In a real application, you'd also send this data to your backend here
                alert('Package changes saved successfully!');
            }
        }
    });

    // Cancel edit for package card
    cancelEditButton.addEventListener('click', () => {
        editFormContainer.style.display = 'none';
        currentEditingCard = null; // Reset
    });

    // --- Background Change Logic ---

    // Open background modal
    openBackgroundModalBtn.addEventListener('click', () => {
        backgroundModal.style.display = 'flex'; // Use flex to center the modal
        // Populate current background image in modal if exists
        const currentBg = bodyElement.style.backgroundImage;
        if (currentBg && currentBg !== 'none') {
            // Remove 'url("' and '")' from the string
            const imageUrl = currentBg.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
            previewBackgroundImage.src = imageUrl;
            previewBackgroundImage.style.display = 'block';
            uploadBackgroundPlaceholder.style.display = 'none';
        } else {
            previewBackgroundImage.style.display = 'none';
            previewBackgroundImage.src = '';
            uploadBackgroundPlaceholder.style.display = 'flex';
        }
    });

    // Close background modal
    closeBackgroundModalBtn.addEventListener('click', () => {
        backgroundModal.style.display = 'none';
    });

    // Close modal if clicking outside of content
    window.addEventListener('click', (event) => {
        if (event.target == backgroundModal) {
            backgroundModal.style.display = 'none';
        }
    });

    // Trigger background image upload input
    triggerBackgroundImageUploadButton.addEventListener('click', () => {
        backgroundImageUploadInput.click();
    });

    // Handle background image file selection
    backgroundImageUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewBackgroundImage.src = e.target.result;
                previewBackgroundImage.style.display = 'block';
                uploadBackgroundPlaceholder.style.display = 'none';
            };
            reader.readAsDataURL(file);
        } else {
            previewBackgroundImage.style.display = 'none';
            previewBackgroundImage.src = '';
            uploadBackgroundPlaceholder.style.display = 'flex';
        }
    });

    // Save background changes
    saveBackgroundChangesButton.addEventListener('click', () => {
        if (previewBackgroundImage.src && previewBackgroundImage.style.display === 'block') {
            Pcontainer.style.backgroundImage = `url('${previewBackgroundImage.src}')`;
            alert('Background changed successfully!');
        } else {
            bodyElement.style.backgroundImage = 'none'; // Or set to a default color/image
            alert('Background removed or set to default!');
        }
        backgroundModal.style.display = 'none';
    });

    // Cancel background changes
    cancelBackgroundChangesButton.addEventListener('click', () => {
        backgroundModal.style.display = 'none';
        // Reset the modal's preview to the current body background or default if nothing was chosen
        const currentBg = bodyElement.style.backgroundImage;
        if (currentBg && currentBg !== 'none') {
            const imageUrl = currentBg.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
            previewBackgroundImage.src = imageUrl;
            previewBackgroundImage.style.display = 'block';
            uploadBackgroundPlaceholder.style.display = 'none';
        } else {
            previewBackgroundImage.style.display = 'none';
            previewBackgroundImage.src = '';
            uploadBackgroundPlaceholder.style.display = 'flex';
        }
    });

    // Initial render when the page loads
    renderPackages();
});