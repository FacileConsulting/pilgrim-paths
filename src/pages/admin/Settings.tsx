import { useEffect, useMemo, useState } from 'react';
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { 
  Settings as SettingsIcon, 
  InfoIcon,
  User, 
  Bell, 
  Mail,
  Globe,
  Shield,
  Database,
  Key,
  Save
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { report } from 'process';

// File imports
import { BASE_URL } from "@/lib/constant";

const Settings = () => {

  const [databaseStatus, setDatabaseStatus] = useState<String>('checking...');
  const [emailStatus, setEmailStatus] = useState<String>('checking...');
  const [fileStatus, setFileStatus] = useState<String>('checking...');
  
  const [inputData, setInputData] = useState<any>({
    platformName: "Travel Agency Management System",
    platformDescription: "Travel Agency Management System",
    adminEmail: "kiranmlvya@gmail.com",
    supportEmail: "support@hajjumrah.com",
    inquiryNotification: true,
    providerNotification: true,
    packageNotification: true,
    reportNotification: false,
    smtpHost: "smtp.gmail.com",
    smtpPort: 465,
    enableSSL: true,
    smtpUsername: "",
    smtpPassword: "",
    mapboxAccessToken: "",
    apiRateLimit: 1000,
    publicAPIAccess: true,
    autoBackup: true,
    retentionDays: 30
  });

  const handleInput = (
    e
  ) => {
    const { id, value } = e.currentTarget;
    setInputData((prev) => ({ ...prev, [id]: value }));
  };

  const handleBackup = async (type: String) => {
    try {
      const response = await fetch(`${BASE_URL}/api/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type })
      });

      const data = await response.json();

      if (response.ok) {
        toast({ title: data.message });
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error handleBackup save data:", error);
      toast({ title: "Something went wrong!" });
    }
  };

  const validation = () => {
    let isValid = true;
    const {
      platformName,
      platformDescription,
      adminEmail,
      supportEmail,
      smtpPort,
      smtpUsername,
      apiRateLimit,
      retentionDays,
    } = inputData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^\d+$/;

    if (!retentionDays || !numberRegex.test(retentionDays)) {
      toast({ title: 'Please enter a backup retention days' });
      isValid = false;
    }

    if (!apiRateLimit || !numberRegex.test(apiRateLimit)) {
      toast({ title: 'Please enter a valid api rate limit' });
      isValid = false;
    }

    if (!smtpUsername || !emailRegex.test(smtpUsername)) {
      toast({ title: 'Please enter a valid email' });
      isValid = false;
    }

    if (!smtpPort || !numberRegex.test(smtpPort)) {
      toast({ title: 'Please enter a valid port number' });
      isValid = false;
    }

    if (!supportEmail || !emailRegex.test(supportEmail)) {
      toast({ title: 'Please enter a valid support email' });
      isValid = false;
    }

    if (!platformDescription) {
      toast({ title: 'Please enter platform description' });
      isValid = false;
    }

    if (!adminEmail || !emailRegex.test(adminEmail)) {
      toast({ title: 'Please enter a valid admin email' });
      isValid = false;
    }

    if (!platformName) {
      toast({ title: 'Please enter platform name' });
      isValid = false;
    }
    return isValid;
  }

  const handleSaveSettings = async () => {
    if (!validation()) return;
    const payload: any = {
      type: "SETTINGS_UPDATE",
      ...inputData
    };
    try {
      const response = await fetch(`${BASE_URL}/api/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload })
      });

      const data = await response.json();

      if (response.ok) {
        toast({ title: data.message });
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error settings save data:", error);
      toast({ title: "Something went wrong!" });
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "SETTINGS_FETCH" })
      });

      const data = await response.json();

      if (response.ok) {
        const {
          platformName,
          platformDescription,
          supportEmail,
          adminEmail,
          inquiryNotification,
          providerNotification,
          packageNotification,
          reportNotification,
          smtpHost,
          smtpPort,
          enableSSL,
          smtpUsername,
          smtpPassword,
          mapboxAccessToken,
          publicAPIAccess,
          apiRateLimit,
          autoBackup,
          retentionDays
        } = data.data;

        setInputData({
          platformName,
          platformDescription,
          supportEmail,
          adminEmail,
          inquiryNotification,
          providerNotification,
          packageNotification,
          reportNotification,
          smtpHost,
          smtpPort,
          enableSSL,
          smtpUsername,
          smtpPassword,
          mapboxAccessToken,
          publicAPIAccess,
          apiRateLimit,
          autoBackup,
          retentionDays
        });
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error settings fetch data:", error);
      toast({ title: "Something went wrong!" });
    }
  }

  const systemStatus = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "SYSTEM_STATUS" })
      });

      const data = await response.json();

      if (response.ok) {
        const {
          databaseStatus,
          emailStatus,
          fileStatus
        } = data;

        setDatabaseStatus(databaseStatus);
        setEmailStatus(emailStatus);
        setFileStatus(fileStatus);
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error settings status data:", error);
      toast({ title: "Something went wrong!" });
    }
  }

  useEffect(() => {
    fetchSettings();
    systemStatus();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your platform configuration and preferences</p>
        </div>

        {/* General Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="platformName">Platform Name</Label>             
                <Input 
                  id="platformName" 
                  value={inputData.platformName}
                  onInput={handleInput} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input 
                  type="email"
                  id="adminEmail" 
                  value={inputData.adminEmail}
                  onInput={handleInput} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="platformDescription">Platform Description</Label>                         
              <Textarea 
                id="platformDescription" 
                value={inputData.platformDescription}
                rows={3}
                onInput={handleInput} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input 
                type="email"
                id="supportEmail" 
                value={inputData.supportEmail}
                onInput={handleInput} />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">New Inquiry Notifications</div>
                <div className="text-sm text-muted-foreground">Receive notifications when customers submit new inquiries</div>
              </div>
              <Switch 
                id="inquiryNotification" 
                checked={inputData.inquiryNotification}                                       
                onCheckedChange={(checked) => setInputData((prev) => ({ ...prev, inquiryNotification: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Package Update Notifications</div>
                <div className="text-sm text-muted-foreground">Get notified when providers update their packages</div>
              </div>
              <Switch 
                id="packageNotification" 
                checked={inputData.packageNotification}                                       
                onCheckedChange={(checked) => setInputData((prev) => ({ ...prev, packageNotification: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">New Provider Registration</div>
                <div className="text-sm text-muted-foreground">Notifications for new provider registrations</div>
              </div>
              <Switch 
                id="providerNotification" 
                checked={inputData.providerNotification}                                       
                onCheckedChange={(checked) => setInputData((prev) => ({ ...prev, providerNotification: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Daily Summary Reports</div>
                <div className="text-sm text-muted-foreground">Receive daily activity summaries via email</div>
              </div>
              <Switch 
                id="reportNotification" 
                checked={inputData.reportNotification}                                       
                onCheckedChange={(checked) => setInputData((prev) => ({ ...prev, reportNotification: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Configuration */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="smtpHost">SMTP Host</Label>
                <Input 
                  readOnly
                  id="smtpHost"
                  value={inputData.smtpHost}
                  onInput={handleInput} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPort">SMTP Port</Label>             
                <Input 
                  id="smtpPort"
                  value={inputData.smtpPort}
                  onInput={handleInput} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="smtpUsername">SMTP Username</Label>                
                <Input 
                  type="email"
                  id="smtpUsername" 
                  value={inputData.smtpUsername}
                  onInput={handleInput} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPassword">SMTP Password</Label>                      
                <Input 
                  type="password"
                  id="smtpPassword" 
                  value={inputData.smtpPassword}
                  onInput={handleInput} />
              </div>
            </div>
            <div className="flex items-center gap-2">             
              <Switch 
                id="enableSSL" 
                checked={inputData.enableSSL}                                       
                onCheckedChange={(checked) => setInputData((prev) => ({ ...prev, enableSSL: checked }))}
              />
              <Label htmlFor="ssl-enabled">Enable SSL/TLS</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-5 w-5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Port : 587 & SSL/TLS : false</p>
                    <p>Port : 465 & SSL/TLS : true</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">Add an extra layer of security to admin accounts</div>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Auto-logout Inactive Sessions</div>
                <div className="text-sm text-muted-foreground">Automatically log out inactive admin sessions after 2 hours</div>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Provider Verification Required</div>
                <div className="text-sm text-muted-foreground">Require manual verification for new provider registrations</div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* API Configuration */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="mapbox-token">Mapbox Access Token</Label>
              <Input 
                id="mapboxAccessToken" 
                type="password" 
                placeholder="pk.eyJ1..."
                value={inputData.mapboxAccessToken}
                onInput={handleInput} />
              <p className="text-sm text-muted-foreground">Required for location mapping features</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiRateLimit">API Rate Limit (requests per hour)</Label>           
              <Input 
                id="apiRateLimit" 
                type="number" 
                value={inputData.apiRateLimit}
                onInput={handleInput} />
            </div>
            <div className="flex items-center gap-2">            
              <Switch 
                id="publicAPIAccess"
                checked={inputData.publicAPIAccess}                                       
                onCheckedChange={(checked) => setInputData((prev) => ({ ...prev, publicAPIAccess: checked }))}
              />
              <Label htmlFor="publicAPIAccess">Enable Public API Access</Label>
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database & Backup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Automatic Backups</div>
                <div className="text-sm text-muted-foreground">Create daily database backups</div>
              </div>                     
              <Switch 
                id="autoBackup"
                checked={inputData.autoBackup}                                       
                onCheckedChange={(checked) => setInputData((prev) => ({ ...prev, autoBackup: checked }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backup-retention">Backup Retention (days)</Label>              
              <Input 
                type="number"
                id="retentionDays" 
                value={inputData.retentionDays}
                onInput={handleInput} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleBackup('DB_BACKUP_CREATE')}>
                <Database className="h-4 w-4 mr-2" />
                Create Backup Now
              </Button>
              <Button variant="outline" onClick={() => handleBackup('DB_BACKUP_RESTORE')}>
                <Database className="h-4 w-4 mr-2" />
                Restore from Backup
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-sm font-medium">Database</span>
                <Badge variant={databaseStatus === 'Connected' ? 'success' : databaseStatus === 'Disconnected' ? 'destructive' : 'warning'} className="ml-2">{databaseStatus}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-sm font-medium">Email Service</span>
                <Badge variant={emailStatus === 'Active' ? 'success' : emailStatus === 'Inactive' ? 'destructive' : 'warning'} className="ml-2">{emailStatus}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-sm font-medium">File Storage</span>
                <Badge variant={fileStatus === 'Online' ? 'success' : fileStatus === 'Offline' ? 'destructive' : 'warning'} className="ml-2">{fileStatus}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="bg-primary hover:bg-primary-hover" onClick={() => handleSaveSettings()}>
            <Save className="h-4 w-4 mr-2" />
            Save All Settings
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;