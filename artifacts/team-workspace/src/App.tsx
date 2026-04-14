import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import TeamSpace from "@/pages/team-space";
import FocusedView from "@/pages/focused-view";
import TeamSmallView from "@/pages/small-view";
import ItemDetail from "@/pages/item-detail";
import ItemsCard from "@/pages/items-card";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/items" />
      </Route>
      <Route path="/focused/:memberId" component={FocusedView} />
      <Route path="/item/:cardId" component={ItemDetail} />
      <Route path="/team" component={TeamSpace} />
      <Route path="/small" component={TeamSmallView} />
      <Route path="/items" component={ItemsCard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
