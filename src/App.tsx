import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { firebaseAuth, firestoreDatabase } from "./config/firebaseConfig";
import {
  InventoryCreate,
  InventoryList,
  InventoryShow,
} from "./pages/inventory";
import { SalesCreate, SalesList } from "./pages/sales";
import { TrackingList } from "./pages/tracking";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={firestoreDatabase.getDataProvider()}
                routerProvider={routerBindings}
                authProvider={firebaseAuth.getAuthProvider()}
                resources={[
                  {
                    name: "sales",
                    list: "/sales",
                    create: "/sales/create",
                    edit: "/sales/edit/:id",
                    show: "/sales/show/:id",
                  },
                  {
                    name: "tracking",
                    list: "/tracking",
                    meta: {
                      label: "Tracking",
                    },
                  },
                  {
                    name: "inventory",
                    list: "/inventory",
                    create: "/inventory/create",
                    edit: "/inventory/edit/:id",
                    show: "/inventory/show/:id",
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "jxqjIl-2VAhTr-n91RG4",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2 Header={() => <Header sticky />}>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="sales" />}
                    />
                    <Route path="/inventory">
                      <Route index element={<InventoryList />} />
                      <Route path="create" element={<InventoryCreate />} />
                      <Route path="edit/:id" element={<></>} />
                      <Route path="show/:id" element={<InventoryShow />} />
                    </Route>
                    <Route path="/sales">
                      <Route index element={<SalesList />} />
                      <Route path="create" element={<SalesCreate />} />
                    </Route>
                    <Route path="/tracking">
                      <Route index element={<TrackingList />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
