export const userData = {
  _id: "user_id",
  username: "username",
  projects: {
    project_id: {
      project_id: "project_id",
      project_name: "project_name",
    },
  },
  dashboard: {
    tables: {
      assigned: {
        table_id: "assigned",
        table_name: "Assigned",
        ticket_ids: ["assigned_ticket_id_1", "assigned_ticket_id_2"],
      },
      claimed: {
        table_id: "claimed",
        table_name: "Claimed",
        ticket_ids: ["claimed_ticket_id_1", "claimed_ticket_id_2"],
      },
      completed: {
        table_id: "completed",
        table_name: "Completed",
        ticket_ids: ["completed_ticket_id_1", "completed_ticket_id_2"],
      },
    },
    tickets: {
      assigned_ticket_id_1: {
        ticket_id: "assigned_ticket_id_1",
        ticket_title: "assigned_ticket_id_1 title",
        ticket_description: "assigned_ticket_id_1 description",
      },
      assigned_ticket_id_2: {
        ticket_id: "assigned_ticket_id_2",
        ticket_title: "assigned_ticket_id_2 title",
        ticket_description: "assigned_ticket_id_2 description",
      },
      claimed_ticket_id_1: {
        ticket_id: "claimed_ticket_id_1",
        ticket_title: "claimed_ticket_id_1 title",
        ticket_description: "claimed_ticket_id_1 description",
      },
      claimed_ticket_id_2: {
        ticket_id: "claimed_ticket_id_2",
        ticket_title: "claimed_ticket_id_2 title",
        ticket_description: "claimed_ticket_id_2 description",
      },
      completed_ticket_id_1: {
        ticket_id: "completed_ticket_id_1",
        ticket_title: "completed_ticket_id_1 title",
        ticket_description: "completed_ticket_id_1 description",
      },
      completed_ticket_id_2: {
        ticket_id: "completed_ticket_id_2",
        ticket_title: "completed_ticket_id_2 title",
        ticket_description: "completed_ticket_id_2 description",
      },
    },
    table_order: ["assigned", "claimed", "completed"],
  },
};

export const projectData = {
  _id: "project_id",
  owners: {
    owner_user_id: {
      user_id: "user_id (owner)",
      username: "username (owner)",
    },
  },
  dashboard: {
    tables: {
      assigned: {
        table_id: "assigned",
        table_name: "Assigned",
        ticket_ids: ["assigned_ticket_id_1", "assigned_ticket_id_2"],
      },
      claimed: {
        table_id: "claimed",
        table_name: "Claimed",
        ticket_ids: ["claimed_ticket_id_1", "claimed_ticket_id_2"],
      },
      completed: {
        table_id: "completed",
        table_name: "Completed",
        ticket_ids: ["completed_ticket_id_1", "completed_ticket_id_2"],
      },
    },
    tickets: {
      assigned_ticket_id_1: {
        ticket_id: "assigned_ticket_id_1",
        ticket_title: "assigned_ticket_id_1 title",
        ticket_description: "assigned_ticket_id_1 description",
      },
      assigned_ticket_id_2: {
        ticket_id: "assigned_ticket_id_2",
        ticket_title: "assigned_ticket_id_2 title",
        ticket_description: "assigned_ticket_id_2 description",
      },
      claimed_ticket_id_1: {
        ticket_id: "claimed_ticket_id_1",
        ticket_title: "claimed_ticket_id_1 title",
        ticket_description: "claimed_ticket_id_1 description",
      },
      claimed_ticket_id_2: {
        ticket_id: "claimed_ticket_id_2",
        ticket_title: "claimed_ticket_id_2 title",
        ticket_description: "claimed_ticket_id_2 description",
      },
      completed_ticket_id_1: {
        ticket_id: "completed_ticket_id_1",
        ticket_title: "completed_ticket_id_1 title",
        ticket_description: "completed_ticket_id_1 description",
      },
      completed_ticket_id_2: {
        ticket_id: "completed_ticket_id_2",
        ticket_title: "completed_ticket_id_2 title",
        ticket_description: "completed_ticket_id_2 description",
      },
    },
    table_order: ["assigned", "claimed", "completed"],
  },
  teams: {
    team_id: {
      team_id: 'team_id',
      team_name: 'teamname',
    }
  }
};

export const Team = {
  // same as project but with members instead of teams
}
