// Maps and nearby hospitals functionality

class NearbyHospitals {
  constructor() {
    this.hospitals = [];
    this.userLocation = null;
    this.map = null;
    
    // Sample hospital data (in real app, this would come from an API)
    this.sampleHospitals = [
      {
        id: 1,
        name: 'City General Hospital',
        address: '123 Medical Center Dr, City, State 12345',
        phone: '(555) 123-4567',
        distance: '1.2 miles',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        emergency: true,
        rating: 4.5
      },
      {
        id: 2,
        name: 'Community Medical Center',
        address: '456 Health Ave, City, State 12345',
        phone: '(555) 987-6543',
        distance: '2.5 miles',
        coordinates: { lat: 40.7589, lng: -73.9851 },
        emergency: true,
        rating: 4.2
      },
      {
        id: 3,
        name: 'Westside Urgent Care',
        address: '789 Care Blvd, City, State 12345',
        phone: '(555) 456-7890',
        distance: '3.1 miles',
        coordinates: { lat: 40.7831, lng: -73.9712 },
        emergency: true,
        rating: 4.0
      },
      {
        id: 4,
        name: 'Children\'s Hospital',
        address: '321 Pediatric Way, City, State 12345',
        phone: '(555) 234-5678',
        distance: '4.3 miles',
        coordinates: { lat: 40.7614, lng: -73.9776 },
        emergency: true,
        rating: 4.7
      }
    ];
  }
  
  async loadNearbyHospitals() {
    try {
      // Get user location
      await this.getUserLocation();
      
      // In a real app, we would fetch from a hospitals API
      // For now, use sample data
      this.hospitals = this.sampleHospitals;
      
      // Sort by distance
      this.hospitals.sort((a, b) => {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
      });
      
      return this.hospitals;
    } catch (error) {
      console.error('Error loading hospitals:', error);
      // Return sample data even if location fails
      return this.sampleHospitals;
    }
  }
  
  async getUserLocation() {
    return new Promise((resolve, reject) => {
      if (this.userLocation) {
        resolve(this.userLocation);
        return;
      }
      
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
            // Use default location (New York) as fallback
            this.userLocation = { lat: 40.7128, lng: -74.0060 };
            resolve(this.userLocation);
          }
        );
      } else {
        // Use default location
        this.userLocation = { lat: 40.7128, lng: -74.0060 };
        resolve(this.userLocation);
      }
    });
  }
  
  // Initialize map (simulated - in a real app you would use Google Maps API)
  initMap(elementId) {
    const mapElement = document.getElementById(elementId);
    if (!mapElement) return;
    
    // In a real implementation, this would initialize Google Maps
    console.log('Initializing map on element:', elementId);
    
    // For simulation, just show a placeholder
    mapElement.innerHTML = `
      <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; text-align: center;">
        <i class="fas fa-map-marked-alt" style="font-size: 3rem; color: #666; margin-bottom: 1rem;"></i>
        <h3>Interactive Map</h3>
        <p>In a real application, this would show an interactive map with hospitals marked.</p>
        <p>Your location: ${this.userLocation ? `${this.userLocation.lat.toFixed(4)}, ${this.userLocation.lng.toFixed(4)}` : 'Not available'}</p>
        <div class="mt-3">
          <button class="btn btn-secondary" onclick="alert('Map functionality requires Google Maps API integration')">
            <i class="fas fa-directions"></i> Get Directions
          </button>
        </div>
      </div>
    `;
  }
  
  // Get directions to a hospital
  getDirections(hospitalId) {
    const hospital = this.hospitals.find(h => h.id === hospitalId);
    if (!hospital) return;
    
    if (this.userLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${this.userLocation.lat},${this.userLocation.lng}&destination=${hospital.coordinates.lat},${hospital.coordinates.lng}&travelmode=driving`;
      window.open(url, '_blank');
    } else {
      alert('Please enable location services to get directions.');
    }
  }
}

// Create global instance
const nearbyHospitals = new NearbyHospitals();
