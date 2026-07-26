/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Screen, TransitionDirection, Report, Alert } from './types';
import { INITIAL_REPORTS, INITIAL_ALERTS } from './data';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ReportForm from './components/ReportForm';
import SurveillanceMap from './components/SurveillanceMap';
import AlertsCenter from './components/AlertsCenter';
import NavigationLayout from './components/NavigationLayout';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('login');
  const [transitionDir, setTransitionDir] = useState<TransitionDirection>('none');
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);

  // Manage unread alerts counter dynamically
  const unreadAlertsCount = useMemo(() => {
    return alerts.filter(a => !a.isRead).length;
  }, [alerts]);

  const handleNavigate = (target: Screen, direction: TransitionDirection) => {
    setTransitionDir(direction);
    // Execute screen swap after setting transition direction
    setTimeout(() => {
      setActiveScreen(target);
    }, 50);
  };

  const handleMarkAlertRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a));
  };

  const handleAddReport = (newReportData: Omit<Report, 'id' | 'timeAgo' | 'status'>) => {
    const randomId = `SURV-2024-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReport: Report = {
      ...newReportData,
      id: randomId,
      timeAgo: 'Just now',
      status: 'Active'
    };

    setReports(prev => [newReport, ...prev]);

    // Also trigger a corresponding live alert in the Alerts feed to keep system highly cohesive!
    const newAlert: Alert = {
      id: `ALERT-${Math.floor(100 + Math.random() * 900)}`,
      category: 'Outbreak',
      severity: newReportData.severity === 'critical' ? 'critical' : newReportData.severity === 'high' ? 'high' : 'medium',
      title: `New Report: ${newReportData.diseaseName} Detected`,
      description: `New case cluster reported by ${newReportData.reporter} in ${newReportData.location}. Affected population: ${newReportData.affectedCount} ${newReportData.species}.`,
      timeAgo: 'Just now',
      isRead: false,
      actionLabel: 'Open Map',
      actionScreen: 'map'
    };

    setAlerts(prev => [newAlert, ...prev]);
  };

  // Define dynamic motion animation variants for screen transitions
  const animationVariants = {
    initial: (dir: TransitionDirection) => {
      if (dir === 'forward') return { x: '100%', opacity: 0 };
      if (dir === 'backward') return { x: '-100%', opacity: 0 };
      if (dir === 'up') return { y: '100%', opacity: 0 };
      return { opacity: 0 };
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: (dir: TransitionDirection) => {
      if (dir === 'forward') return { x: '-100%', opacity: 0 };
      if (dir === 'backward') return { x: '100%', opacity: 0 };
      if (dir === 'up') return { y: '-100%', opacity: 0 };
      return { opacity: 0 };
    }
  };

  // Screen Router rendering
  const renderScreenContent = () => {
    switch (activeScreen) {
      case 'dashboard':
        return (
          <Dashboard
            reports={reports}
            alerts={alerts}
            onNavigate={handleNavigate}
            onMarkAlertRead={handleMarkAlertRead}
          />
        );
      case 'report':
        return (
          <ReportForm
            onAddReport={handleAddReport}
            onNavigate={handleNavigate}
          />
        );
      case 'map':
        return (
          <SurveillanceMap
            reports={reports}
            onNavigate={handleNavigate}
          />
        );
      case 'alerts':
        return (
          <AlertsCenter
            alerts={alerts}
            unreadAlertsCount={unreadAlertsCount}
            onMarkAlertRead={handleMarkAlertRead}
            onNavigate={handleNavigate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden select-none">
      <AnimatePresence mode="wait" initial={false}>
        {activeScreen === 'login' ? (
          <motion.div
            key="login"
            custom={transitionDir}
            variants={animationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <Login onLogin={() => handleNavigate('dashboard', 'forward')} />
          </motion.div>
        ) : (
          <motion.div
            key="app-shell"
            custom={transitionDir}
            variants={animationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <NavigationLayout
              activeScreen={activeScreen}
              onNavigate={handleNavigate}
              unreadAlertsCount={unreadAlertsCount}
            >
              {renderScreenContent()}
            </NavigationLayout>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
