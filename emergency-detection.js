// Emergency detection and auto-call functionality

class EmergencyDetector {
  constructor() {
    this.severityLevel = 'low';
    this.userLocation = null;
    this.emergencyContacts = [];
    this.autoCallEnabled = true;
    
    this.loadEmergencyContacts();
  }
  
  loadEmergencyContacts() {
    // Try to load from localStorage
    const savedContacts = localStorage.getItem('emergencyContacts');
    if (savedContacts) {
      this.emergencyContacts = JSON.parse(savedContacts);
    } else {
      // Default emergency numbers (varies by country)
      this.emergencyContacts = [
        { name: 'Police', number: '911', country: 'US' },
        { name: 'Fire Department', number: '911', country: 'US' },
        { name: 'Ambulance', number: '911', country: 'US' }
      ];
    }
  }
  
  saveEmergencyContacts() {
    localStorage.setItem('emergencyContacts', JSON.stringify(this.emergencyContacts));
  }
  
  addEmergencyContact(name, number, country = 'US') {
    this.emergencyContacts.push({ name, number, country });
    this.saveEmergencyContacts();
  }
  
  detectSeverity(symptoms) {
    // AI-like severity detection based on symptoms
    const severeKeywords = ['unconscious', 'not breathing', 'bleeding heavily', 'chest pain', 'severe burn', 'choking'];
    const moderateKeywords = ['broken bone', 'sprain', 'moderate bleeding', 'fever', 'vomiting'];
    
    const text = symptoms.toLowerCase();
    
    let severityScore = 0;
    
    severeKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        severityScore += 3;
      }
    });
    
    moderateKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        severityScore += 2;
      }
    });
    
    if (severityScore >= 3) {
      this.severityLevel = 'high';
    } else if (severityScore >= 1) {
      this.severityLevel = 'medium';
    } else {
      this.severityLevel = 'low';
    }
    
    return this.severityLevel;
  }
  
  initiateEmergencyCall(number) {
    // In a real app, this would initiate a phone call
    console.log(`Initiating emergency call to: ${number}`);
    
    // For web, we can only show a confirmation
    if (confirm(`Call ${number}? This is a simulation. In a real app, this would dial the number.`)) {
      // Simulate call initiation
      window.open(`tel:${number}`, '_blank');
      return true;
    }
    
    return false;
  }
  
  sendEmergencyMessage(contact, message) {
    // In a real app, this would send an SMS
    console.log(`Sending emergency message to ${contact.name} (${contact.number}): ${message}`);
    
    // For web, we can only show a confirmation
    if (confirm(`Send emergency message to ${contact.name}? This is a simulation.`)) {
      // Simulate SMS sending
      window.open(`sms:${contact.number}?body=${encodeURIComponent(message)}`, '_blank');
      return true;
    }
    
    return false;
  }
  
  getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            resolve(this.userLocation);
          },
          error => {
            console.error('Error getting location:', error);
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation not supported'));
      }
    });
  }
}

// Create global emergency detector instance
const emergencyDetector = new EmergencyDetector();
