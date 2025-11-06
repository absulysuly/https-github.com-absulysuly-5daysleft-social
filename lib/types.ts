// lib/types.ts

// == Base Types ==
export type User = {
  id: string;
  name: string;
  handle: string;
  avatarColor: string;
};

export type Post = {
  id: string;
  author: User;
  content: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string; // ISO date string
  isLiked: boolean; // Indicates if the current user has liked this post
};


// == Candidate Types ==
export type Candidate = {
  id: string;
  uniqueCandidateId: string;
  voterNumber: number | null;
  ballotNumber: string;
  partyNameArabic: string;
  partyNameEnglish: string | null;
  candidateSequence: number | null;
  nominationType: string;
  governorate: string;
  sex: string;
  fullNameArabic: string;
  fullNameEnglish: string | null;
  email: string | null;
  phone: string | null;
  bio: string | null;
  photoUrl: string | null;
  coverPhotoUrl: string | null;
  verificationStatus: string; // Assuming 'unverified', 'pending', 'verified'
  profileCompletionPercent: number;
  viewsCount: number;
  supportersCount: number;
  postsCount: number;
  eventsCount: number;
  referralCode: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  lastActiveAt: string | null; // ISO date string
};
