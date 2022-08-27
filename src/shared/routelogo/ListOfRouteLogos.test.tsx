import ListOfRouteLogos, {sortRouteIds} from './ListOfRouteLogos';
import './ListOfRouteLogos.css'
import './ListOfRouteLogos.tsx'

test.each([
  [["C", "A"], ["A", "C"]],
  [["L", "G"], ["G", "L"]],
  [["L", "A"], ["A", "L"]],
  [["M", "C", "F"], ["C", "F", "M"]],
  [["M", "C", "B"], ["B", "M", "C"]],
  [["A", "B", "C", "D"], ["A", "C", "B", "D"]],
])('sortRouteIds', (input: string[], want: string[]) => {
  expect(sortRouteIds(input)).toEqual(want)
});
