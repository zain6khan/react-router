import { Link, Outlet, useSearchParams } from "react-router-dom";
import { getExpenses } from "../expenseData";
 
export default function Expenses() {
  let expenses = getExpenses();
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <div style={{ display: "flex" }}>
      <nav>
       {/* Adds a text input that edits the searchParams to the inputted text.
       If there is a change in the input box then the searchParam is set. */}
      <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {/* For each expense filter out those that start with the same letters as searchParam */}
        {expenses.filter((expense) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = expense.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
        .map((expense) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/expenses/${expense.number}`}
            key={expense.number}
          >
            {expense.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
