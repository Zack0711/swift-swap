type STICKY_POSITION = 'left' | 'top';
type STICKY_TOP_TABLE = { head: HTMLElement, body: HTMLElement[] };

const wrapTable = (table: HTMLElement, stickPositions: STICKY_POSITION[] = ['left']) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'table-scroll sticky-' + stickPositions.join(' sticky-');
  wrapper.setAttribute('style', 'max-height:300px');
  const parent = table.parentNode;
  if (parent) {
    parent.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  }
}

const transformStickyTopTable = (tableGroup: STICKY_TOP_TABLE) => {
  const { head, body } = tableGroup;
  const headTdElements = head.querySelectorAll('td');
  const headContent:string[] = []
  const bodyContent:string[][] = []

  headTdElements.forEach(td => {
    headContent.push(td.innerHTML);
    const parent = td.parentElement;
    parent?.removeChild(td);
  });

  body.forEach(table => {
    const tdElements = table.querySelectorAll('td');
    const rowContent:string[] = [];
    tdElements.forEach(td => {
      rowContent.push(td.innerHTML);
    });
    bodyContent.push(rowContent);
    const parent = table.parentElement;
    parent?.removeChild(table);
  });

  head.innerHTML = `
  <thead>
    <tr>
${headContent.map(content => `      <th scope="col">${content}</th>`).join('\n')}
    </tr>
  </thead>
  <tbody>${bodyContent.map(row => `
    <tr>
${row.map(content => `      <td class="text-nowrap text-mono">${content}</td>`).join('\n')}
    </tr>`).join('')}
  </tbody>
  `;


  head.className = 'table text-center';
  head.removeAttribute('width');
  head.setAttribute('style', 'min-width:600px; width:100%');
  wrapTable(head, ['top']);
}

const transformStickyLeftTable = (table: HTMLElement) => {
  const thElements = table.querySelectorAll('th');
  const tdElements = table.querySelectorAll('td');

  thElements.forEach(th => {
    th.className = 'text-nowrap text-mono';
    th.scope = 'row';
    th.removeAttribute('style');
  });

  tdElements.forEach(td => {
    td.className = 'text-nowrap text-mono';
    td.removeAttribute('style');
  });

  table.className = 'table';
  table.removeAttribute('width');
  table.setAttribute('style', 'min-width:600px; width:100%');
  wrapTable(table, ['left']);
}

const transformStickyBothTable = (table: HTMLElement) => {
  const firstTr = table.querySelector('tr');
  const headContent:string[] = [];
  const bodyContent:string[][] = [];

  if (firstTr) {
    const thElements = firstTr.querySelectorAll('th');
    const tdElements = firstTr.querySelectorAll('td');
    thElements.forEach(th => {
      headContent.push(th.innerHTML);
    });
    tdElements.forEach(td => {
      headContent.push(td.innerHTML);
    });
    const parent = firstTr.parentElement;
    parent?.removeChild(firstTr);
  }

  const remainingTrs = table.querySelectorAll('tr');
  remainingTrs.forEach(tr => {
    const thElements = tr.querySelectorAll('th');
    const tdElements = tr.querySelectorAll('td');
    const rowContent:string[] = [];
    thElements.forEach(th => {
      rowContent.push(th.innerHTML);
    });
    tdElements.forEach(td => {
      rowContent.push(td.innerHTML);
    });
    bodyContent.push(rowContent);
  });

  table.innerHTML = `
  <thead>
    <tr>
${headContent.map((content, i) => `      <th scope="col" ${i === 0 ? 'style="width:140px"' : ''}>${content}</th>`).join('\n')}
    </tr>
  </thead>
  <tbody>${bodyContent.map(row => `
    <tr>
${row.map((content, i) => `      <td class="text-nowrap text-mono" ${i === 0 ? 'style="background-color:#DE4407; color:#ffffff;"' : ''}>${content}</td>`).join('\n')}
    </tr>`).join('')}
  </tbody>
  `;
  table.className = 'table text-center';
  table.removeAttribute('width');
  table.setAttribute('style', 'min-width:600px; width:100%');
  wrapTable(table, ['left', 'top']);
}

export function transformTables(input: string): string {
  try {
    // Create a DOM parser to work with HTML objects
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/html');
    
    // Step 1: Find all <table> elements
    const allTables = Array.from(doc.querySelectorAll('table'));
    
    // Step 2: Filter out tables whose parent element is a <div> with class "table-scroll sticky-top"
    const tablesToTransform = allTables.filter(table => {
      const parent = table.parentElement;
      if (parent && parent.tagName.toLowerCase() === 'div') {
          const parentClasses = parent.className.split(' ');
          const hasTableScroll = parentClasses.includes('table-scroll');
          const hasStickyTop = parentClasses.includes('sticky-top');
          return !(hasTableScroll && hasStickyTop);
      }
      return true; // Transform if no parent div or not the right class
    });

    const stickyTopTables: STICKY_TOP_TABLE[] = [];
    let stickyTopNum = 0;

    const stickyLeftTables: HTMLElement[] = [];
    const stickyBothTables: HTMLElement[] = [];

    // Step 3: Identify sticky top, sticky left and sticky both tables
    tablesToTransform.forEach(table => {
      const tableStyle = table.getAttribute('style') || '';
      if (tableStyle.includes('table-layout:fixed')) {
        if (tableStyle.includes('background-color:#DE481D')) {
          stickyTopTables.push({ head: table, body:[] });
          stickyTopNum++;
        }
        if (tableStyle.includes('background-color: #F2F2F2')) {
          if (stickyTopNum > 0) {
            stickyTopTables[stickyTopNum - 1].body.push(table);
          }
        }
      }

      if (tableStyle.includes('border-collapse: collapse;')) {
        const firstTd = table.querySelectorAll('td')[0];
        if (firstTd && firstTd.getAttribute('style')?.includes('#DE481D')) {
          stickyBothTables.push(table);
        } else {
          stickyLeftTables.push(table);
        }
      }
    });

    console.log('Identified sticky both tables:', stickyBothTables);
    console.log('Identified sticky left tables:', stickyLeftTables);
    // Step 4: Transform identified sticky top tables
    stickyTopTables.forEach(tableGroup => {
      transformStickyTopTable(tableGroup);
    });

    // Step 5: Transform identified sticky left tables
    stickyLeftTables.forEach(table => {
      transformStickyLeftTable(table);
    });

    // Step 6: Transform identified sticky both tables
    stickyBothTables.forEach(table => {
      transformStickyBothTable(table);
    });

    // Return the transformed HTML
    // Extract only the body content to avoid html/head tags
    const bodyContent = doc.body.innerHTML;
    return bodyContent || input; // Fallback to original input if parsing fails
      
  } catch (error) {
    // Fallback to original input if DOM parsing fails
    console.warn('DOM parsing failed, returning original input:', error);
    return input;
  }
}