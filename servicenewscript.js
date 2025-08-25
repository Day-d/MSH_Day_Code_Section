  // Section: Manage Services
  document.querySelectorAll('section:nth-of-type(1) button').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent.trim();

      if (text.includes("Add new service category")) {
        alert("You can add a new service category here.");
      } else if (text.includes("Edit Section Overview")) {
        alert("You can now edit the section overview.");
      } else if (text.includes("Save Section Overview")) {
        alert("Overview saved successfully!");
      } else if (text.includes("Add new bullet point")) {
        alert("You can add a new bullet point now.");
      } else if (text.includes("Delete bullet point")) {
        const confirmDelete = confirm("Are you sure to delete this bullet point?");
        if (confirmDelete) alert("Bullet point deleted.");
      } else if (text.includes("Upload New Photo")) {
        alert("Select a new photo to upload.");
      } else if (text.includes("Delete Air Ticket Service")) {
        const confirmDelete = confirm("Do you really want to delete this service?");
        if (confirmDelete) alert("Air Ticket Service deleted.");
      } else if (text.includes("Save Air Ticket Details")) {
        alert("Air ticket details saved successfully.");
      }
    });
  });

  // Section: Stats Counters
  document.querySelectorAll('section:nth-of-type(2) button').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent.trim();

      if (text.includes("Delete")) {
        const confirmDelete = confirm("Are you sure you want to delete this stat?");
        if (confirmDelete) alert("Stat deleted.");
      } else if (text.includes("Edit")) {
        alert("Stat item is ready to edit.");
      } else if (text.includes("Add New Stat Item")) {
        alert("Ready to add a new stat item.");
      } else if (text.includes("Cancel Editing")) {
        alert("Stat editing canceled.");
      } else if (text.includes("Save All Stats")) {
        alert("All stats saved.");
      }
    });
  });

  // Section: Gallery
  document.querySelectorAll('section:nth-of-type(3) button').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent.trim();

      if (text.includes("Upload Photo") || text.includes("Upload New Photo")) {
        alert("Select a photo to upload to the gallery.");
      } else if (text.includes("Delete")) {
        const confirmDelete = confirm("Are you sure to delete this image?");
        if (confirmDelete) alert("Image deleted.");
      } else if (text.includes("Edit")) {
        alert("Image is now editable.");
      } else if (text.includes("Cancel Editing")) {
        alert("Gallery editing canceled.");
      } else if (text.includes("Save Gallery Order")) {
        alert("Gallery order saved successfully.");
      }
    });
  });