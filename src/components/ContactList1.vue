<template>
  <div class="contacts-sync">
    <h1 class="title">Sync Contacts</h1>

    <!-- Navigation Back to Chat -->
    <button @click="goBackToChat" class="button button-back">Back to Chat</button>

    <!-- Sync from Phone Contacts -->
    <div v-if="!isQrScanning && !isAddingManually" class="sync-section">
      <h2 class="section-title">Sync from Phone</h2>
      <p class="instructions">
        Upload a file with your contacts or click on the scan button to scan the QR code to sync your contacts.
      </p>
      <div class="buttons">
        <button @click="triggerFileUpload" class="button">Upload Contacts</button>
        <button @click="startQrScan" class="button button-secondary">Scan QR Code</button>
        <button @click="startManualAdd" class="button button-secondary">Add Manually</button>
      </div>
      <input type="file" ref="fileInput" @change="handleFileUpload" accept=".vcf" style="display: none;" />
    </div>

    <!-- QR Code Scanner -->
    <div v-if="isQrScanning" class="qr-scanner">
      <h2 class="section-title">Scan QR Code</h2>
      <p class="instructions">
        Scan the QR code displayed below with your phone to sync contacts.
      </p>
      <qrcode-stream @decode="onDecode" @error="onError" class="qr-capture" />
      <button @click="stopQrScan" class="button button-secondary">Stop QR Code Scanner</button>
    </div>

    <!-- Manual Contact Addition -->
    <div v-if="isAddingManually" class="manual-addition">
      <h2 class="section-title">Add Contacts Manually</h2>
      <form @submit.prevent="addContact">
        <div class="form-group">
          <label for="contactName">Contact Name:</label>
          <input v-model="manualContact.name" id="contactName" type="text" placeholder="Enter contact name" required />
        </div>
        <div class="form-group">
          <label for="contactPhone">Contact Phone:</label>
          <input v-model="manualContact.phone" id="contactPhone" type="text" placeholder="Enter contact phone number" required />
        </div>
        <button type="submit" class="button">Add Contact</button>
        <button @click="cancelManualAdd" type="button" class="button button-secondary">Cancel</button>
      </form>
    </div>

    <!-- Display Sync Status -->
    <div v-if="syncStatus" class="sync-status">
      {{ syncStatus }}
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'; // Correct import for QR code scanning

export default {
  components: {
    QrcodeStream, // Register QR code stream component
  },
  data() {
    return {
      syncStatus: '',
      isQrScanning: false,
      isAddingManually: false,
      qrCodeValue: 'http://localhost:3000/contacts-sync', // URL or data for QR code
      manualContact: { name: '', phone: '' }, // Contact data for manual addition
    };
  },
  methods: {
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const vcfData = e.target.result;
          this.syncContactsFromFile(vcfData);
        };
        reader.readAsText(file);
      }
    },
    
    async syncContactsFromFile(vcfData) {
      try {
        const contacts = this.parseVcfData(vcfData);
        await this.sendContactsToServer(contacts);
        this.syncStatus = 'Contacts synced successfully from file!';
      } catch (error) {
        console.error('Error syncing contacts:', error);
        this.syncStatus = 'Error syncing contacts from file.';
      }
    },
    
    parseVcfData(vcfData) {
      const contacts = [];
      const lines = vcfData.split('\n');
      lines.forEach(line => {
        if (line.startsWith('FN:')) {
          contacts.push({ name: line.substring(3).trim() });
        }
      });
      return contacts;
    },

    async sendContactsToServer(contacts) {
      await fetch('http://localhost:3000/sync-contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contacts }),
      });
    },
    
    startQrScan() {
      this.isQrScanning = true;
    },
    
    stopQrScan() {
      this.isQrScanning = false;
    },

    async fetchContactsFromUrl(url) {
      try {
        const response = await fetch(url);
        const contacts = await response.json();
        await this.sendContactsToServer(contacts);
        this.syncStatus = 'Contacts synced successfully from QR code!';
      } catch (error) {
        console.error('Error fetching contacts from QR code:', error);
        this.syncStatus = 'Error syncing contacts from QR code.';
      }
    },

    onDecode(decodedString) {
      this.syncStatus = 'QR Code scanned successfully!';
      this.fetchContactsFromUrl(decodedString);
    },
    
    onError(error) {
      console.error('QR Code error:', error);
      this.syncStatus = 'Error scanning QR code.';
    },

    startManualAdd() {
      this.isAddingManually = true;
    },

    cancelManualAdd() {
      this.isAddingManually = false;
      this.manualContact = { name: '', phone: '' }; // Reset form
    },

    async addContact() {
      try {
        const { name, phone } = this.manualContact;
        const contact = { name, phone };
        await this.sendContactsToServer([contact]);
        this.syncStatus = 'Contact added successfully!';
      } catch (error) {
        console.error('Error adding contact:', error);
        this.syncStatus = 'Error adding contact.';
      } finally {
        this.cancelManualAdd(); // Reset form and exit manual addition mode
      }
    },

    goBackToChat() {
      // Implement navigation logic here, e.g., using Vue Router
      this.$router.push({ name: 'Chat' }); // Adjust based on your route name
    },
  },
};
</script>

<style scoped>
.contacts-sync {
  padding: 2rem;
  font-family: Arial, sans-serif;
  color: #333;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #4CAF50;
}

.button-back {
  background-color: #2196F3;
  color: white;
  margin-bottom: 1rem;
}

.sync-section, .qr-scanner, .manual-addition {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  background: #f9f9f9;
}

.section-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.instructions {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #45a049;
}

.button-secondary {
  background-color: #f4f4f4;
  color: #333;
}

.button-secondary:hover {
  background-color: #e0e0e0;
}

.qr-code {
  text-align: center;
  margin-bottom: 1rem;
}

.sync-status {
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: #d32f2f;
}

.manual-addition {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
