package internal

type Task struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	CreatedAt   string `json:"createdAt"`
	StartDate   string `json:"startDate"`
	EndDate     string `json:"endDate"`
	Priority    string `json:"priority"`
	Completed   bool   `json:"completed"`
}

type TaskPayload struct {
	Title       *string `json:"title"`
	Description *string `json:"description"`
	Priority    *string `json:"priority"`
	StartDate   *string `json:"startDate"`
	EndDate     *string `json:"endDate"`
	Completed   *bool   `json:"completed"`
}

type Project struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	CreatedAt   string `json:"createdAt"`
	StartDate   string `json:"startDate"`
	EndDate     string `json:"endDate"`
	Priority    string `json:"priority"`
	Tasks       []Task `json:"tasks"`
}

type ProjectPayload struct {
	Name        *string `json:"name"`
	Description *string `json:"description"`
	Priority    *string `json:"priority"`
	StartDate   *string `json:"startDate"`
	EndDate     *string `json:"endDate"`
}
