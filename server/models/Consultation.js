import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema(
  {
    // Reference ticket ID
    refId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Contact details
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [120, 'Name too long'],
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },

    // Service and scope
    service: {
      type: String,
      required: [true, 'Service selection is required'],
      enum: [
        'Fire Extinguishers',
        'Fire Alarm Systems',
        'Fire Hydrant Systems',
        'Sprinkler Systems',
        'Turnkey Life Safety AMC',
      ],
    },
    scope: {
      type: String,
      required: [true, 'Project scope is required'],
      trim: true,
      maxlength: [2000, 'Scope description too long'],
    },

    // Status tracking
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'contacted', 'converted', 'closed'],
      default: 'pending',
    },

    // Internal notes (added by admin later)
    notes: {
      type: String,
      default: '',
    },

    // Metadata
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    ipAddress: {
      type: String,
      default: '',
    },
    userAgent: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Auto-generate JSE-XXXXXX reference ID before saving
consultationSchema.pre('validate', function (next) {
  if (!this.refId) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const rand = Math.floor(100000 + Math.random() * 900000);
    this.refId = `JSE-${rand}`;
  }
  next();
});

const Consultation = mongoose.model('Consultation', consultationSchema);

export default Consultation;
