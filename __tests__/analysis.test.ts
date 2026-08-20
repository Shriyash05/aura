import { analyseLocally, validateClothingAnalysis } from '../services/wardrobe/analysis';

describe('clothing analysis validation', () => {
  it('rejects unknown categories and clamps confidence', () => {
    const result = validateClothingAnalysis({ category: 'unknown' as never, primaryColor: '  blue ', confidence: 4 });
    expect(result.category).toBe('tops');
    expect(result.primaryColor).toBe('blue');
    expect(result.confidence).toBe(1);
  });
  it('uses filename clues only as a local fallback', () => {
    expect(analyseLocally('navy-jeans.jpg')).toMatchObject({ category: 'bottoms', subcategory: 'jeans', primaryColor: 'navy' });
  });
});
