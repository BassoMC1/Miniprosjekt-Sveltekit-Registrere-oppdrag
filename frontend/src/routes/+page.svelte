<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    /**
     * @type {any[]}
     */
    let data = [];
    const message = writable('');

    /**
     * @type {any}
     */
    let totalTasks;
  
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/api/it');
        if (response.ok) {
          const result = await response.json();
          // @ts-ignore
          result.data.sort((a, b) => {
          // @ts-ignore
          return new Date(a.Dato) - new Date(b.Dato);
        });
        data = result.data;
        calculateCounts();
        totalTasks = data.length
        console.log(data)
        } else {
          message.set('Failed to fetch data.');
        }
      } catch (error) {
        message.set('Unknown error while fetching data.');
      }
    }
  
    onMount(() => {
      fetchData();
    });
  
    async function removeAllData() {
      try {
        const response = await fetch('http://localhost:3000/api/it/remove?id=all', { method: 'DELETE' });
        if (response.ok) {
          fetchData(); // Refetch data to update the table
          message.set('All data removed successfully.');
        } else {
          message.set('Failed to remove all data.');
        }
      } catch (error) {
        message.set('Unknown error while removing all data.');
      }
    }
  
    /**
     * @param {any} id
     */
    
    async function removeData(id) {
      try {
        const response = await fetch(`http://localhost:3000/api/it/remove?id=${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchData(); // Refetch data to update the table
          message.set('Data removed successfully.');
        } else {
          message.set('Failed to remove data.');
        }
      } catch (error) {
        message.set('Unknown error while removing data.');
      }
    }
  
    let dato = '';
    let namnPaBrukar = '';
    let produkt = '';
    let skildring = '';
  
    async function submitForm() {
      const formData = {
        Dato: dato,
        Name: namnPaBrukar,
        Produkt: produkt,
        Skildring: skildring,
      };
  
      try {
        const response = await fetch('http://localhost:3000/api/it/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          fetchData(); // Refetch data to update the table
          message.set('Form submitted successfully.');
          // Reset form fields after successful submission
          dato = '';
          namnPaBrukar = '';
          produkt = '';
          skildring = '';
        } else {
          message.set('Failed to submit form.');
        }
      } catch (error) {
        message.set('Unknown error while submitting form.');
      }
    }



    let counts = {
    PC: 0,
    MAC: 0,
    Nettbrett: 0,
  };

  // Calculate the counts from the data
  // @ts-ignore
  function calculateCounts() {
    counts = {
    PC: 0,
    MAC: 0,
    Nettbrett: 0,
    };
    data.forEach((item) => {
      if (counts.hasOwnProperty(item.Produkt)) {
        // @ts-ignore
        counts[item.Produkt] += 1;
      }
    });
  }

  </script>
  
  <style>
    /* Table Styles */
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid black;
      padding: 8px;
      text-align: left;
    }
  
    /* Form Input Styles */
    input, select, textarea {
      width: 100%; /* Full width */
      padding: 12px; /* Some padding */
      margin: 8px 0; /* Margin for spacing */
      display: inline-block; /* Allows for the width to take effect */
      border: 1px solid #ccc; /* Gray border */
      border-radius: 4px; /* Rounded borders */
      box-sizing: border-box; /* Ensures padding doesn't affect width */
    }
  
    /* Button Styles */
    button {
      width: 100%; /* Full width */
      background-color: #4CAF50; /* Green background */
      color: white; /* White text */
      padding: 14px 20px; /* Padding */
      margin: 8px 0; /* Margin for spacing */
      border: none; /* No border */
      border-radius: 4px; /* Rounded borders */
      cursor: pointer; /* Pointer cursor on hover */
    }
  
    button:hover {
      background-color: #45a049; /* Darker green background on hover */
    }
  
    /* Styling for the Remove All Data Button separately if needed */
    .removedata-btn {
      background-color: #f44336; /* Red background for contrast */
    }

    .bar-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
    .chart-container {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    height: 200px; /* Adjust as needed */
    border: 1px solid #ccc;
    margin: 16px;
  }

  .bar {
    width: 50px; /* Adjust as needed */
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin: 0 10px; /* Adjust as needed */
    text-align: center;
    background-color: #4CAF50;
    transition: height 0.3s ease;
  }

  .label {
    writing-mode: tb-rl;
    transform: rotate(-180deg);
  }
  
  
    /* Additional styling can go here */
  </style>
  
    {#if $message}
        <p>{$message}</p>
    {/if}

  <table>
    <thead>
      <tr>
        <th>Dato</th>
        <th>Namn på brukar</th>
        <th>Produkt</th>
        <th>Skildring</th>
        <th>Handling</th>
      </tr>
    </thead>
    <tbody>
      {#each data as item (item.ID)}
        <tr>
          <td>{item.Dato}</td>
          <td>{item.Name}</td>
          <td>{item.Produkt}</td>
          <td>{item.Skildring}</td>
          <td><button class="removedata-btn" on:click={() => removeData(item.ID)}>Slett</button></td>
        </tr>
      {/each}
    </tbody>
  </table>
  
  <button class="removedata-btn" on:click={removeAllData}>Remove All Data</button>
  

<form on:submit|preventDefault={submitForm}>
<input
  type="date"
  bind:value={dato}
  placeholder="Dato" />

<input
  type="text"
  bind:value={namnPaBrukar}
  placeholder="Namn på brukar" />

<select bind:value={produkt}>
  <option value="">Velg produkt</option>
  <option value="PC">PC</option>
  <option value="MAC">MAC</option>
  <option value="Nettbrett">Nettbrett</option>
</select>

<textarea
  bind:value={skildring}
  placeholder="Skildring av feil"></textarea>

<button type="submit">Send inn</button>
</form>


<div class="chart-container">
  {#each Object.entries(counts) as [product, count]}
    <div class="bar" style="height: {count / totalTasks * 100}%;">
      <span class="label">{product} ({count})</span>
    </div>
  {/each}
</div>