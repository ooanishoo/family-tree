/**
 * Type declaration for supported relationships
 */
export type Relationship =
  | 'PATERNAL-UNCLE'
  | 'MATERNAL-UNCLE'
  | 'PATERNAL-AUNT'
  | 'MATERNAL-AUNT'
  | 'SISTER-IN-LAW'
  | 'BROTHER-IN-LAW'
  | 'COUSIN'
  | 'FATHER'
  | 'MOTHER'
  | 'CHILD'
  | 'SON'
  | 'DAUGHTER'
  | 'BROTHER'
  | 'SISTER'
  | 'GRAND-CHILD'
  | 'GRAND-DAUGHTER'
  | 'GRAND-SON'
  | 'SIBLING'
  | 'SPOUSE'

/**
 * Type declaration for searchable relationships
 */
export type SearchableRelationship =
  | Relationship
  | 'ANCESTOR'
  | 'DESCENDANT'
  | 'COUSIN-IN-LAW'
  | 'FATHER-IN-LAW'
  | 'MOTHER-IN-LAW'
  | 'SON-IN-LAW'
  | 'DAUGHTER-IN-LAW'

/**
 * Type declaration for specific relationship allowed to be added
 */
export type AllowedRelationship = Extract<Relationship, 'CHILD' | 'SPOUSE'>
