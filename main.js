

document.addEventListener('DOMContentLoaded', function() {
    const pdfLink = document.querySelector('.pdf-link');
    const overlay = document.getElementById('pdf-overlay');
    const closeBtn = document.querySelector('.close-btn');
    const pdfEmbed = document.getElementById('pdf-embed');

    pdfLink.addEventListener('click', function(e) {
        e.preventDefault();
        const pdfPath = this.getAttribute('data-pdf');
        pdfEmbed.setAttribute('src', pdfPath);
        overlay.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});

// Isotope grid.
var $grid = $('.grid').isotope({
    itemSelector: '.list-item',
    layoutMode: 'fitRows',
    transitionDuration: 0,
    stagger: 10,
    initLayout: false,
    getSortData: {
      name: '.name',
      symbol: '.symbol',
      number: '.number parseInt',
      category: '[data-category]',
      weight: function( itemElem ) {
        var weight = $( itemElem ).find('.weight').text();
        return parseFloat( weight.replace( /[\(\)]/g, '') );
      }
    }
  });

  // Bind filter button click.
  $('#filters').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    localStorage.setItem('filterValue', filterValue);
    $grid.isotope({ filter: filterValue });
  });

  // Change is-checked class on buttons.
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });

  function update_isotope() {
    // Retrieve cached button click.
    var defaultFilterValue = localStorage.getItem('filterValue');
    if (defaultFilterValue == null) {
      defaultFilterValue = ".highlight"
    }
    $grid.isotope({ filter: defaultFilterValue });
    var buttons = document.getElementsByClassName("button");
    for (var currButton of buttons) {
      if (currButton.getAttribute('data-filter') == defaultFilterValue) {
        currButton.classList.add('is-checked');
      } else {
        currButton.classList.remove('is-checked');
      }
    }
  }

  function toggle_bio() {
    var x = document.getElementById("more-bio");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function toggle_highlights() {
    var x = document.getElementById("main-highlights");
    var y = document.getElementById("more-highlights");
    var b = document.getElementById("toggle_highlights_button")
    if (y.style.display === "none") {
      x.style.display = "none";
      y.style.display = "block";
      b.innerHTML = "Show less"
      update_isotope();
    } else {
      x.style.display = "block";
      y.style.display = "none";
      b.innerHTML = "Show more"
      update_isotope();
    }
  }

  update_isotope();