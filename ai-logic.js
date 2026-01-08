// AI guidance logic for step-by-step instructions

class AIGuidance {
  constructor() {
    this.currentEmergency = null;
    this.currentStep = 0;
    this.steps = [];
    this.isCompleted = false;
  }
  
  // Analyze symptoms and provide guidance
  analyzeEmergency(symptoms) {
    const symptomsLower = symptoms.toLowerCase();
    
    // Determine emergency type based on symptoms
    if (symptomsLower.includes('choking')) {
      return this.getChokingGuidance();
    } else if (symptomsLower.includes('unconscious') || symptomsLower.includes('not breathing')) {
      return this.getCPRGuidance();
    } else if (symptomsLower.includes('bleeding') || symptomsLower.includes('cut')) {
      return this.getBleedingGuidance();
    } else if (symptomsLower.includes('burn')) {
      return this.getBurnGuidance();
    } else if (symptomsLower.includes('broken') || symptomsLower.includes('fracture')) {
      return this.getFractureGuidance();
    } else {
      return this.getGeneralGuidance();
    }
  }
  
  getChokingGuidance() {
    this.currentEmergency = 'choking';
    this.steps = [
      {
        title: 'Assess the situation',
        instructions: 'Ask the person: "Are you choking?" If they can cough or speak, encourage them to keep coughing.',
        voice: 'Ask the person if they are choking. If they can cough or speak, encourage them to keep coughing.',
        important: true
      },
      {
        title: 'Perform back blows',
        instructions: 'Lean the person forward and give up to 5 sharp blows between their shoulder blades with the heel of your hand.',
        voice: 'Lean the person forward and give up to five sharp blows between their shoulder blades with the heel of your hand.',
        important: true
      },
      {
        title: 'Perform abdominal thrusts',
        instructions: 'Stand behind the person, wrap your arms around their waist. Make a fist with one hand, place it above their navel, grasp with other hand, and give quick upward thrusts.',
        voice: 'Stand behind the person, wrap your arms around their waist. Make a fist with one hand, place it above their navel, grasp with other hand, and give quick upward thrusts.',
        important: true
      },
      {
        title: 'Call for emergency help',
        instructions: 'If the object doesn\'t dislodge after 5 cycles of back blows and abdominal thrusts, call emergency services immediately.',
        voice: 'If the object doesn\'t dislodge after five cycles of back blows and abdominal thrusts, call emergency services immediately.',
        important: true
      }
    ];
    
    return {
      type: 'choking',
      severity: 'high',
      steps: this.steps
    };
  }
  
  getCPRGuidance() {
    this.currentEmergency = 'cpr';
    this.steps = [
      {
        title: 'Check responsiveness',
        instructions: 'Gently shake the person and shout "Are you okay?" Check for breathing.',
        voice: 'Gently shake the person and shout "Are you okay?" Check for breathing.',
        important: true
      },
      {
        title: 'Call for help',
        instructions: 'If unresponsive, call emergency services immediately or ask someone to call.',
        voice: 'If the person is unresponsive, call emergency services immediately or ask someone to call.',
        important: true
      },
      {
        title: 'Begin chest compressions',
        instructions: 'Place heel of one hand on center of chest, other hand on top. Push hard and fast (100-120 compressions per minute, about 2 inches deep).',
        voice: 'Place the heel of one hand on the center of the chest, other hand on top. Push hard and fast, about one hundred to one hundred twenty compressions per minute, about two inches deep.',
        important: true
      },
      {
        title: 'Give rescue breaths',
        instructions: 'After 30 compressions, tilt head back, lift chin, pinch nose, and give 2 breaths (1 second each).',
        voice: 'After thirty compressions, tilt the head back, lift the chin, pinch the nose, and give two breaths, one second each.',
        important: true
      },
      {
        title: 'Continue CPR',
        instructions: 'Continue cycles of 30 compressions and 2 breaths until help arrives or person starts breathing.',
        voice: 'Continue cycles of thirty compressions and two breaths until help arrives or the person starts breathing.',
        important: true
      }
    ];
    
    return {
      type: 'cpr',
      severity: 'critical',
      steps: this.steps
    };
  }
  
  getBleedingGuidance() {
    this.currentEmergency = 'bleeding';
    this.steps = [
      {
        title: 'Apply direct pressure',
        instructions: 'Use a clean cloth or bandage to apply firm, direct pressure on the wound.',
        voice: 'Use a clean cloth or bandage to apply firm, direct pressure on the wound.',
        important: true
      },
      {
        title: 'Elevate the injury',
        instructions: 'If possible, raise the injured area above the level of the heart.',
        voice: 'If possible, raise the injured area above the level of the heart.',
        important: false
      },
      {
        title: 'Apply pressure to pressure points',
        instructions: 'If bleeding doesn\'t stop, apply pressure to the artery supplying blood to the area.',
        voice: 'If bleeding does not stop, apply pressure to the artery supplying blood to the area.',
        important: false
      },
      {
        title: 'Seek medical attention',
        instructions: 'For severe bleeding that doesn\'t stop with direct pressure, seek emergency medical help immediately.',
        voice: 'For severe bleeding that does not stop with direct pressure, seek emergency medical help immediately.',
        important: true
      }
    ];
    
    return {
      type: 'bleeding',
      severity: 'medium',
      steps: this.steps
    };
  }
  
  getBurnGuidance() {
    this.currentEmergency = 'burn';
    this.steps = [
      {
        title: 'Cool the burn',
        instructions: 'Hold the burned area under cool (not cold) running water for 10-15 minutes.',
        voice: 'Hold the burned area under cool, not cold, running water for ten to fifteen minutes.',
        important: true
      },
      {
        title: 'Remove tight items',
        instructions: 'Remove any jewelry or tight clothing from the burned area before swelling occurs.',
        voice: 'Remove any jewelry or tight clothing from the burned area before swelling occurs.',
        important: true
      },
      {
        title: 'Cover the burn',
        instructions: 'Cover the burn with a sterile, non-adhesive bandage or clean cloth.',
        voice: 'Cover the burn with a sterile, non-adhesive bandage or clean cloth.',
        important: false
      },
      {
        title: 'Take pain reliever',
        instructions: 'Consider over-the-counter pain relievers like ibuprofen or acetaminophen.',
        voice: 'Consider over-the-counter pain relievers like ibuprofen or acetaminophen.',
        important: false
      },
      {
        title: 'Seek medical help',
        instructions: 'For severe burns (large area, deep, or on face, hands, feet, or genitals), seek emergency medical attention.',
        voice: 'For severe burns, large area, deep, or on face, hands, feet, or genitals, seek emergency medical attention.',
        important: true
      }
    ];
    
    return {
      type: 'burn',
      severity: 'medium',
      steps: this.steps
    };
  }
  
  getFractureGuidance() {
    this.currentEmergency = 'fracture';
    this.steps = [
      {
        title: 'Immobilize the area',
        instructions: 'Don\'t move the injured area. Support it with a splint or sling if available.',
        voice: 'Do not move the injured area. Support it with a splint or sling if available.',
        important: true
      },
      {
        title: 'Apply ice',
        instructions: 'Apply ice packs wrapped in cloth to reduce swelling and pain.',
        voice: 'Apply ice packs wrapped in cloth to reduce swelling and pain.',
        important: false
      },
      {
        title: 'Elevate if possible',
        instructions: 'If possible, elevate the injured area above heart level to reduce swelling.',
        voice: 'If possible, elevate the injured area above heart level to reduce swelling.',
        important: false
      },
      {
        title: 'Seek medical attention',
        instructions: 'Go to an emergency room or urgent care for proper diagnosis and treatment.',
        voice: 'Go to an emergency room or urgent care for proper diagnosis and treatment.',
        important: true
      }
    ];
    
    return {
      type: 'fracture',
      severity: 'medium',
      steps: this.steps
    };
  }
  
  getGeneralGuidance() {
    this.currentEmergency = 'general';
    this.steps = [
      {
        title: 'Stay calm and assess',
        instructions: 'Take a deep breath and carefully assess the situation.',
        voice: 'Take a deep breath and carefully assess the situation.',
        important: true
      },
      {
        title: 'Check for danger',
        instructions: 'Make sure the area is safe for you and the injured person.',
        voice: 'Make sure the area is safe for you and the injured person.',
        important: true
      },
      {
        title: 'Call for help if needed',
        instructions: 'If the situation seems serious, call emergency services or ask someone to call.',
        voice: 'If the situation seems serious, call emergency services or ask someone to call.',
        important: true
      },
      {
        title: 'Provide basic care',
        instructions: 'Offer comfort, keep the person warm, and don\'t give food or drink if serious injury is suspected.',
        voice: 'Offer comfort, keep the person warm, and do not give food or drink if serious injury is suspected.',
        important: false
      },
      {
        title: 'Monitor and wait for help',
        instructions: 'Stay with the person, monitor their condition, and wait for professional help to arrive.',
        voice: 'Stay with the person, monitor their condition, and wait for professional help to arrive.',
        important: true
      }
    ];
    
    return {
      type: 'general',
      severity: 'low',
      steps: this.steps
    };
  }
  
  getNextStep() {
    if (this.currentStep < this.steps.length) {
      const step = this.steps[this.currentStep];
      this.currentStep++;
      return step;
    } else {
      this.isCompleted = true;
      return {
        title: 'Guidance Complete',
        instructions: 'All steps have been completed. Continue monitoring the situation until professional help arrives.',
        voice: 'All steps have been completed. Continue monitoring the situation until professional help arrives.',
        important: true
      };
    }
  }
  
  reset() {
    this.currentEmergency = null;
    this.currentStep = 0;
    this.steps = [];
    this.isCompleted = false;
  }
}

// Create global AI guidance instance
const aiGuidance = new AIGuidance();
