export class ConcernLevel {

  static readonly concernLevels = [
    'Commendable',
    'Caution',
    'Problematic',
    'Severe'
  ];

  static readonly Commendable = ConcernLevel.concernLevels[0];
  static readonly Caution = ConcernLevel.concernLevels[1];
  static readonly Problematic = ConcernLevel.concernLevels[2];
  static readonly Severe = ConcernLevel.concernLevels[3];
}
