interface Reason {
  identifier: string;
  description: string;
}

export class CommentReasons {
  static readonly Reasons: Reason[] = [
    { identifier: 'A', description: 'A: Investing, Tax, or Legal Advice'},
    { identifier: 'E', description: 'E: Earnings Claim'},
    { identifier: 'P', description: 'P: Company Policies'},
    { identifier: 'Q', description: 'Q: Qualifying or Selection Process'},
    { identifier: 'S', description: 'S: False/Misleading Statement'},
    { identifier: 'T', description: 'T: Unsupported Testimonials'},
    { identifier: 'U', description: 'U: Unrealistic Expectations'},
    { identifier: 'W', description: 'W: Unauthorized Warrantees'},
  ];
}
