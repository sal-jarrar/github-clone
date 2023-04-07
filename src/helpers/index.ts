import moment from "moment";
import { Repository } from "../types";

export function countRepositoriesPerMonth(
  repositories: Repository[]
): Record<string, number> {
  let counts: Record<string, number> = {};

  repositories.forEach((repository) => {
    let createdAt = new Date(repository.created_at);
    let month = moment(createdAt).format("MMM-YY");

    if (counts[month]) {
      counts[month]++;
    } else {
      counts[month] = 1;
    }
  });

  return counts;
}
